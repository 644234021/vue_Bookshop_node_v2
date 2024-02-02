<template>
    <div>
       <nav class="navbar navbar-expand navbar-light  mb-3 bg-secondary bg-gradient rounded"  style="--bs-bg-opacity: .3;">
           <div class="container-fluid">
               <span class="navbar-brand fw-bold" v-on:click.prevent="" href="">ข้อมูลผู้แต่งหนังสือ</span>
          </div>
       </nav>
   <table class="table">
     <thead>
       <tr>
         <th>ผู้แต่งหนังสือ</th>
         <th class="text-center"></th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="item in BookInSearch" :key="item.bookid">
         <td class="text-center">
           <img :src="apiImageUrl+item.bookid+'?w='+getDateTimeStamp()" class="fluid rounded" width="65" :alt="item.title" />
         </td>
         <td>
           {{ item.title }}
         </td>
         <td>
           {{ item.author }}
         </td>
         <td class="text-end" style="width: 100px">
           {{ Intl.NumberFormat('en-US').format(item.price) }} ฿
         </td>
         <td class="text-center fs-6" style="width: 100px">
           <router-link :to="{ name: 'AdminBookDetail', params: { id: item.bookid }}">
             <i class="bi bi-search text-info" data-toggle="tooltip" title="ดูรายละเอียดหนังสือ"></i>
           </router-link>
           <br/>
           <router-link :to="{ name: 'EditBook', params: { id: item.bookid }}">
             <i class="bi bi-pencil text-success" data-toggle="tooltip" title="แก้ไขข้อมูลหนังสือ"></i>
           </router-link>
           <br/>
           <i class="bi bi-trash text-danger" data-toggle="tooltip" title="ลบข้อมูลหนังสือ" @click="DeleteBook(item.bookid,item.title)"></i>
         </td>
       </tr>
     </tbody>
   </table>

   <div class="input-group  mb-3">
     <input v-model="search" v-on:keydown.enter.prevent="SearchAuthor" class="form-control" type="search" placeholder="Search" aria-label="Search" />
     <div class="input-group-append">
       <button class="btn btn-outline-primary" type="button" v-on:click="SearchAuthor">Search</button>
       <button class="btn btn-outline-success" type="button" v-on:click="ClearSearch">Clear</button>
     </div>
   </div>

   <table class="table">
     <thead>
       <tr>
         <th>ชื่อผู้แต่ง</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="author in AuthorsInSearch" :key="author">
         <td>{{ author }}</td>
       </tr>
     </tbody>
   </table>
  </div>

</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import axios from "axios"
    import Swal from 'sweetalert2'
    import { useCookies } from "vue3-cookies"

    const { cookies } = useCookies()
    const token = cookies.get('token')

    const search = ref("")
    const authors = ref([])  
    const apiImageUrl = import.meta.env.VITE_API_URL + '/books/cover/'
    const apiUrl = import.meta.env.VITE_API_URL + '/books'

    onMounted(async () => {
    const response = await axios.get(apiUrl, { headers: { Authorization: 'bearer ' + token } })
    authors.value = response.data.data.map(book => book.author)  // เลือกเฉพาะชื่อผู้แต่ง
    })


    const booksLength = ref(0)
    const perPage = 5
    const page = ref(1)

    const AuthorsInSearch = computed(() => {
    var authorFilter = []
    if (search.value != "") {
        authorFilter = authors.value.filter((author) => {
            if (search.value != "") {
                return author.toLowerCase().includes(search.value.toLowerCase())
            }
        })
    } else {
        authorFilter = authors.value
    }

    booksLength.value = authorFilter.length
    authorFilter = authorFilter.slice((page.value - 1) * perPage, page.value * perPage)
    return authorFilter
    })

    function nextPage() {
    if (page.value !== Math.ceil(booksLength.value / perPage)) {
        page.value += 1
    }
    }

    function prevPage() {
    if (page.value !== 1) {
        page.value -= 1
    }
    }

    function goToPage(numPage) {
    page.value = numPage
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
   
