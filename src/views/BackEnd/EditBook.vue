<template>
    <div>
        <nav class="navbar navbar-expand navbar-light  mb-5 bg-secondary bg-gradient rounded"  style="--bs-bg-opacity: .3;">
            <div class="container-fluid">
                <span class="navbar-brand fw-bold" >ปรับปรุงข้อมูลหนังสือ</span>
            </div>

        </nav>
    </div>



    <div class="container">
        <Form  class="needs-validation" @submit.prevent="submit" novalidate>
            <div class="form-group row mb-3">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="fw-bold" for="title">ชื่อหนังสือ:</label>                        
                        <Field  type="text" v-model="book.title" :rules="validateRequired" class="form-control" id="title" placeholder="ระบุชื่อหนังสือ" name="title" />                                                                     
                        <ErrorMessage name="title"  class="text-danger"/>
                    </div>
                    
                </div>
            </div>
            <div class="form-group row  mb-3">
                <div class="col-md-5">
                    <div class="form-group">
                        <label class="fw-bold" for="author">ชื่อผู้แต่ง:</label>
                        <Field as="select" name="author" v-model="book.authorid" class="form-control" id="author" :rules="validateRequired">
                            <option :key="author.authorid" :value="author.authorid" v-for="author in authors">{{author.name}}</option>               
                        </Field>
                        <ErrorMessage name="author" class="text-danger"/>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="fw-bold" for="bookimage">ภาพปกหนังสือ (ใหม่):</label>
                        <div class="file">
                            <form v-on:submit.prevent enctype="multipart/form-data">
                                <div class="fields">
                                    <input class="form-control" id="coverimage" type="file"  v-on:change="onSelect" :rules="validateRequired" />
                                </div>
                                <div class="error text-danger d-flex justify-content-start mt-1">
                                    {{ message }}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group d-flex">
                        <label class="fw-bold" >ภาพปกหนังสือ (เดิม):</label>
                        <img style="width:60px" :src="imagePath" class="card-img-top rounded" alt="..." />
                     
                    </div>
                </div>
            </div>
            <div class="form-group row  mb-3">
                <div class="col-md-2">
                    <div class="form-group">
                        <label class="fw-bold" for="price">ราคา:</label>
                        <Field type="number" v-model="book.price" :rules="validateRequired" class="form-control" id="price" placeholder="ระบุราคา" name="price"/>
                        <ErrorMessage name="price" class="text-danger"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label class="fw-bold" for="page">จำนวนหน้า:</label>
                        <Field type="number" v-model="book.pageCount" :rules="validateRequired" class="form-control" id="page" placeholder="ระบุจำนวนหน้า" name="page"/>
                        <ErrorMessage name="page" class="text-danger"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="fw-bold" for="ISBN">ISBN:</label>
                        <Field type="text" v-model="book.isbn" class="form-control" :rules="validateRequired" id="ISBN" placeholder="ระบุหมายเลข ISBN" name="ISBN"/>
                        <ErrorMessage name="ISBN" class="text-danger"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="fw-bold" for="publishedDate">วันที่ตีพิมพ์:</label>
                        <div class="input-group">
                            <Field disabled type="text" v-model="dayMonthYear" :rules="validateRequired" class="form-control" id="publishedDate" name="publishedDate"/>
                        
                            <div class="input-group-append">
                                <VDatePicker v-model="book.publishedDate">
                                    <template #default="{ togglePopover }">
                                    <button
                                        class="btn-secondary btn-small text-sm btn btn-primary"
                                        @click="togglePopover" 
                                        v-on:click.prevent=""
                                    >
                                        <i class="bi bi-calendar-date"></i>
                                    </button>
                                    </template>
                                </VDatePicker>
                            </div>

                        </div>
                        
                        <ErrorMessage name="publishedDate" class="text-danger"/>
                    </div>
                </div>
            </div>
            <div class="form-group row  mb-3">

            </div>
            <div class="form-group row  mb-3">
                <div class="col-md-5">
                    <div class="form-group">
                        <label class="fw-bold" for="author">ประเภทหนังสือ:</label>
                        <Field as="select" name="category" v-model="book.category" class="form-control" id="category" :rules="validateRequired">
                            <option :key="category.name" :value="category.name" v-for="category in categories">{{category.name}}</option>               
                        </Field>
                        <ErrorMessage name="author" class="text-danger"/>
                    </div>
                </div>
            </div>
            <div class="form-group row  mb-3">

            </div>
            <div class="form-group row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="fw-bold" for="description">คำอธิบาย:</label>
                        <Field v-slot="{ field }" name="description" v-model="book.shortDescription" :rules="validateRequired">
                            <textarea v-bind="field" type="textarea" class="form-control" id="description" placeholder="ระบุคำอธิบายเกี่ยวกับหนังสือ" rows="5" required></textarea>                                            
                        </Field>
                        <ErrorMessage name="description" class="text-danger"/>


                        
                    </div>
                </div>
            </div>

            <div class="float-end mt-3">
                <button class="btn btn-primary mt-4" v-on:click="SaveBook()">บันทึกข้อมูลหนังสือ</button>&nbsp;
                <button class="btn btn-danger mt-4" v-on:click="Cancel()"    >ยกเลิก</button>
            </div>
           
        </Form>
    </div>
</template>

<script setup>
import moment from 'moment'
import {ref,onMounted,computed} from 'vue'
import { useCookies } from "vue3-cookies"
import Swal from 'sweetalert2'
import axios from "axios"
import { useRouter,useRoute } from 'vue-router' 
import { Field, Form, ErrorMessage } from 'vee-validate'

// userRoute() for redirect
const router = useRouter()
const route =useRoute()

// use cookie
const { cookies } = useCookies()
const token=cookies.get('token')
const authors=ref([])
const categories=ref([
    {name:"Web Development"},
    {name:"Internet"},
    {name:"Java"},
    {name:"Microsoft .NET"},
    {name:"Mobile Technology"},
    {name:"Programming"},
    {name:"Software Engineering"},
    {name:"Data Science"},
    {name:"Machine Learning"},
    {name:"Artificial Intelligence"},
    {name:"Others"}
])

const curImageid = ref(0)
const imagePath=ref("")
const apiImageUrl=import.meta.env.VITE_API_URL+'/books/cover/'
const apiUrl=import.meta.env.VITE_API_URL
const file = ref(null)
const message = ref("")

const book=ref( {
            title: null,
            price: 1,
            isbn: null,
            pageCount: 1,
            publishedDate: new Date(),
            shortDescription: null,
            author: null
        })

const dayMonthYear=computed(()=>{
    const date=new Date(book.value.publishedDate)
    const result = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return  result;
})

onMounted(async () => {
    /*
    Steps:
        1. Get Authors to show in dropdown list
        2. Store the list of authors in the reactive variable 'authors'
        3. Get Book Detail by id
            3.1 Extract the book ID from the route parameters
            3.2 Send a GET request to fetch details for the specified book
        4. Store the book details in the reactive variable 'book'
        5. Set Author Information in the 'book' object
        6. Set Image Paths for Book Cover
        7. Error Handling
    */
    
    try {

        // Step 1: Get Authors to show in dropdown list 
        const response = await axios.get(apiUrl + "/authors",{ headers: {"Authorization" : `Bearer ${token}`} });
        // Step 2: Store the list of authors in the reactive variable 'authors'
        authors.value = await response.data.data;

        // Step 3: Get Book Detail by id
        // 3.1 Extract the book ID from the route parameters
        let id = Number(route.params.id)
        // 3.2 Send a GET request to fetch details for the specified book
        const responseBook = await axios.get(apiUrl + "/books/" + id ,{ headers:{ Authorization: 'Bearer ' + token } })
        // Step 4: Store the book details in the reactive variable 'book'
        book.value=responseBook.data.data[0]

        // Step 5: Set Author Information in the 'book' object
        // Extract author details from the book's data and assign them to the book object
        book.value.author=book.value.author
        book.value.authorid=book.value.authorid
        
        // Step 6: Set Image Paths for Book Cover
        // 'curImageid' is used to display the image in the component
        curImageid.value=apiImageUrl+id.toString()
        // 'imagePath' is used to ensure that the image is not cached by appending a timestamp
        imagePath.value=apiImageUrl+id.toString()+'?w='+getDateTimeStamp()
                      
    }
    catch{
        // Step 7: Error Handling
        console.log("error get authors")
    }
    
})

function getDateTimeStamp() {
      const today = new Date();
      const date = today.getFullYear().toString() +  (today.getMonth() + 1).toString() +  today.getDate().toString();
      const time = today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
      const dateTime = date +  time;
      return dateTime;
    }


function validateRequired (value) {
    return !!value || 'กรุณากรอกข้อมูลให้ครบถ้วน'
} 

async function Cancel(){

    Swal.fire({
            icon: "info",
            text: "ต้องการยกเลิกการปรับปรุงข้อมูลหนังสือ ใช่ หรือ ไม่",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ใช่ ต้องการยกเลิก",
            cancelButtonText: "ไม่ต้องการ"
        }).then((result) => { 

            if (result.value) { // <-- if confirmed
                
                
                Swal.fire({
                    icon: "success",
                    title: "กำลังกลับไปหน้ารายการหนังสือ",
                    showConfirmButton: false,
                    timer: 1500
                }).then(async (result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        await router.push({ path: "/admin" })
                    }
                })



            }

        })
}



function onSelect(event) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
  file.value = event.target.files[0]


   if (!allowedTypes.includes(file.value.type)) {
    file.value = null
    message.value = "รองรับไฟล์ภาพ jpeg jpg และ png เท่านั้น"
  } else if (file.value.size > 500000) {
    file.value = null
    message.value = "ขนาดไฟล์เกิน 500kb"
  } else {
    message.value = ""
  } 
}

async function SaveBook(){

    /*
        Steps:
        1. Check if the form is valid
        2. Display a confirmation dialog using Swal (SweetAlert)
        3. If the user confirms the action
        4. Prepare data for submission
            4.1: Create a FormData object
            4.2: Append the file (cover image file) to the FormData object
            4.3: Format publishedDate to YYYY-MM-DD
            4.4: Append the book object to the FormData object
        5. Send data to the API
        6. Handle API response and potential errors
        7. Display a success message and navigate to a different route
        8. Handle any errors that occur during the PUT request

     */

     // Step 1: Check if the form is valid
     if (
            validateRequired(book.value.title) == true &&
            validateRequired(book.value.price) == true &&
            validateRequired(book.value.isbn) == true &&
            validateRequired(book.value.pageCount) == true &&
            validateRequired(book.value.publishedDate) == true  &&
            validateRequired(book.value.shortDescription) == true   &&
            validateRequired(book.value.author) == true 
        ) {

            // Step 2: Display a confirmation dialog using Swal (SweetAlert)
            Swal.fire({
                icon: "info",
                text: "ต้องการปรับปรุงข้อมูลหนังสือเล่มนี้ ใช่ หรือ ไม่",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "ใช่ ต้องการปรับปรุงข้อมูลหนังสือเล่มนี้",
                cancelButtonText: "ไม่ต้องการ"
            }).then(async (result) => { 

                 // Step 3: If the user confirms the action
                if (result.value) { // <-- if confirmed

                    // Step 4: Prepare data for submission
                    // 4.1: Create a FormData object
                    const formData = new FormData();
                    // 4.2: Append the file (cover image file) to the FormData object
                    formData.append("files", file.value);
                    // 4.3: Format publishedDate to YYYY-MM-DD
                    book.value.publishedDate = moment(String(book.value.publishedDate)).format('YYYY-MM-DD');
                    // 4.4: Append the book object to the FormData object
                    formData.append("book", JSON.stringify(book.value));


                    try {

                        // Step 5: Send data to the API
                        const {data,error}=await axios.put(apiUrl + "/books/"+Number(route.params.id), formData,{ headers: {"Authorization" : `Bearer ${token}`} });

                         // Step 6: Handle API response and potential errors
                        if (error != null) {
                            
                            if (error.value.status === 400) {
                                // Display an error message if the data is invalid
                                Swal.fire({
                                    icon: "error",
                                    title: "การบันทึกข้อมูลหนังสือไม่ผ่าน",
                                    text: "กรุณาตรวจข้อมูลหนังสือที่บันทึกอีกครั้ง",
                                    confirmButtonText: "Close",
                                })

                            } else {
                                // Log other errors to the console
                                console.log(error.value.status + " : " + error.value.message);
                            }

                        } else {

                            // Step 7: Display a success message and navigate to a different route
                            Swal.fire({
                                icon: "success",
                                title: "ปรับปรุงหนังสือสำเร็จ",
                                showConfirmButton: false,
                                timer: 1500
                            }).then(async (result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    await router.push({ path: "/admin" })
                                }
                            })
                            
                        }


                    }
                    catch{

                        // Step 8: Handle any errors that occur during the PUT request
                        console.log("error save book")
                    }

                    
                }

            })
        

    }

    
}
</script>

<style  scoped>

</style>