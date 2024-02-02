<template>
    <div class="mb-5">
        <nav class="navbar navbar-expand navbar-light  mb-3 bg-secondary bg-gradient rounded"  style="--bs-bg-opacity: .3;">
            <div class="container-fluid">
                <span class="navbar-brand fw-bold" v-on:click.prevent="" href="">รายการหนังสือ </span>
              
                <div class="navbar-nav mr-auto d-flex justify-content-end">
                    <router-link to="/admin/book_add" class="btn btn-primary 2 my-sm-0"  href="#" role="button" ><i class="bi bi-plus-circle"></i> เพิ่มหนังสือใหม่</router-link>&nbsp;&nbsp;
                </div>
                
            </div>

        </nav>

        <div class="input-group  mb-3">
            <input v-model="search" v-on:keydown.enter.prevent="SearchBook" class="form-control" type="search" placeholder="Search" aria-label="Search" >
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" v-on:click="SearchBook">Search</button>
                <button class="btn btn-outline-success" type="button" v-on:click="ClearSearch">Clear</button>
            </div>
        </div>
        

        <table class="table">
            <thead>
                <tr>
      
                    <th class="text-center">ภาพ</th>
                    <th>ชื่อหนังสือ</th>
                    <th>ผู้แต่งหนังสือ</th>
                    <th class="text-end">ราคา</th>
                    <th class="text-center"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in BookInSearch" :key="item.bookid">

                    <td class="text-center">
                        <img :src="apiImageUrl+item.bookid+'?w='+getDateTimeStamp()" 
                        class="fluid rounded"
                        width="65"
                        :alt="item.title" />
                    </td>
                    <td>
                        {{item.title}}
                    </td>
                    <td>
                        {{item.author}}
                    </td>
                    <td class="text-end" style="width:100px">
                        {{ Intl.NumberFormat('en-US').format(item.price) }} ฿
                    </td>

                    <td class="text-center fs-6" style="width:100px">
                        <router-link :to="{ name: 'AdminBookDetail', params: { id: item.bookid }}">
                            <i class="bi bi-search text-info"  data-toggle="tooltip"  title="ดูรายละเอียดหนังสือ" ></i>
                        </router-link>
                        <br/>
                        <router-link :to="{ name: 'EditBook', params: { id: item.bookid }}">
                            <i class="bi bi-pencil text-success"  data-toggle="tooltip"  title="แก้ไขข้อมูลหนังสือ"></i>
                        </router-link>
                        <br/>
                        <i class="bi bi-trash text-danger"  data-toggle="tooltip"  title="ลบข้อมูลหนังสือ" @click="DeleteBook(item.bookid,item.title)"></i>
                    </td>
                </tr>
                

            </tbody>
        </table>
      
        <nav aria-label="Page navigation example" class="p-0 m-0">
            <ul class="pagination justify-content-end flex-wrap">
                <li class="page-item" >
                    <a class="page-link" href="#" tabindex="-1"  @click="prevPage" :class="{  'disabled':  (page === 1) }  ">หน้าก่อน</a>
                </li>
                <li   v-for="(item,index) in Math.ceil(booksLength/perPage)" @click="goToPage(index+1)" class="page-item">
                    <a class="page-link" :class="{  'bg-primary':  (page === (index+1)), 'text-white':  (page === (index+1)), 'fw-bold':  (page === (index+1)) }" href="#">{{ index+1 }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" :class="(page === Math.ceil(booksLength/perPage)) ? 'disabled' : ''" href="#" @click="nextPage">หน้าถัดไป</a>
                </li>
            </ul>
        </nav>


  
        
    </div>
    </template>
    
    <script setup>
    
    import {  ref,onMounted ,computed} from 'vue'
    import axios from "axios"
    import Swal from 'sweetalert2'
    import { useCookies } from "vue3-cookies"


    // use cookie
    const { cookies } = useCookies()
    const token=cookies.get('token')

    // Mockup Data
    //import books from '@/mockupdata/books'

    const search= ref("")
    const books=ref([])
    const apiImageUrl=import.meta.env.VITE_API_URL+'/books/cover/'
    const apiUrl=import.meta.env.VITE_API_URL+'/books'

    onMounted(async () => {
        const response = await axios.get(apiUrl ,{ headers:{ Authorization: 'bearer ' + token } });
        books.value =  response.data.data;
    })

    function SearchBook (searchvalue) {
        search.value = searchvalue;
    }

    function ClearSearch() {
        search.value = "";
    }

    
    function getDateTimeStamp() {
      const today = new Date();
      const date = today.getFullYear().toString() +  (today.getMonth() + 1).toString() +  today.getDate().toString();
      const time = today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
      const dateTime = date +  time;
      return dateTime;
    }

    async function DeleteBook(bookid,bookName) {



        Swal.fire({
            icon: "info",
            text: `ต้องการลบข้อมูลหนังสือ "${bookName}" ใช่ หรือ ไม่`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ใช่ ต้องการลบ",
            cancelButtonText: "ไม่ต้องการ"
        }).then((result) => { 

            if (result.value) { // <-- if confirmed
                
                
                Swal.fire({
                    icon: "success",
                    title: `ทำการลบหนังสือ "${bookName}" เรียบร้อยแล้ว`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(async (result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        try {
                            await axios.delete(apiUrl + "/" + bookid,{ headers: {"Authorization" : `bearer ${token}`} });
                            var bookIndex = books.value.findIndex(x => x.id === bookid);
                            books.value.splice(bookIndex, 1);
                        }
                        catch{
                            console.log('error')
                        }

                    }
                })



            }

        })

       

  

    }

    const booksLength=ref(0)
        
    const perPage = 5
    const page=ref(1)
    
    const BookInSearch = computed(() => {
        var bookfilter = []
        if (search.value != "") {
            bookfilter = books.value.filter((book) => {
                if (search.value != "") {
                    return book.title.toLowerCase().includes(search.value.toLowerCase())
                }
            });
        } else {
            bookfilter = books.value
        }

        booksLength.value=bookfilter.length
        bookfilter=bookfilter.slice((page.value - 1) * perPage, page.value * perPage)
        return bookfilter
    })

   
    //Pagination
    function nextPage  () {
        
        if (page.value !== Math.ceil(booksLength.value/perPage)) {
            page.value += 1;
        }
    };

    function prevPage ()  {
        if (page.value !== 1) {
            page.value -= 1;
        }
    };

    function goToPage(numPage)  {
        page.value = numPage;
    }

  
    </script>
    
    <style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.4;
    }
    
    #nav {
        padding: 30px;
    }
    
    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }
    
    #nav a.router-link-exact-active {
        color: #42b983;
    }
    </style>
    