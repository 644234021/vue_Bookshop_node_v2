<template>
    <div>
        <nav class="navbar navbar-expand navbar-light  mb-5 bg-secondary bg-gradient rounded"  style="--bs-bg-opacity: .3;">
            <div class="container-fluid">
                <span class="navbar-brand fw-bold" >เพิ่มข้อมูลหนังสือ</span>
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
                        <Field as="select" name="author" v-model="book.author" class="form-control" id="author" :rules="validateRequired">
                            <option :key="author.authorid" :value="author.authorid" v-for="author in authors">{{author.name}}</option>               
                        </Field>
                        <ErrorMessage name="author" class="text-danger"/>
                    </div>
                </div>
                
                <div class="col-md-7">
                    <div class="form-group">
                        <label class="fw-bold" for="bookimage">ภาพปกหนังสือ:</label>
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
                        <label class="fw-bold" for="category">ประเภทหนังสือ:</label>
                        <Field as="select" name="category" v-model="book.category" class="form-control" id="category" :rules="validateRequired">
                            <option :key="category.name" :value="category.name" v-for="category in categories">{{category.name}}</option>               
                        </Field>
                        <ErrorMessage name="category" class="text-danger"/>
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
                <button class="btn btn-danger mt-4" v-on:click="Cancel()"  v-on:click.prevent=""  >ยกเลิก</button>
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
import { useRouter } from 'vue-router' 
import { Field, Form, ErrorMessage } from 'vee-validate'

// userRoute() for redirect
const router = useRouter();

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
     
    try {
        
        //1. Get Authors to show in dropdown list  
        // Add Code
        const response = await axios.get(apiUrl + "/authors",{ headers: {"Authorization" : `Bearer ${token}`} });
        authors.value = await response.data.data;
        
    }
    catch{
        console.log("error get authors")
    }
    
})


function validateRequired (value) {
    return !!value || 'กรุณากรอกข้อมูลให้ครบถ้วน'
} 

async function Cancel(){

    Swal.fire({
            icon: "info",
            text: "ต้องการยกเลิกการเพิ่มข้อมูลหนังสือ ใช่ หรือ ไม่",
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



function getFileName() {
  if (file.value !== null) {
    return file.value.name
  } else {
    message.value = "กรุณาเลือกไฟล์ภาพสำหรับปกหนังสือ"
    return null
  }
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
        2. Display a confirmation dialog to ensure the user's intention
        3. Handle user confirmation
        4. Check if a file has been selected
        5. Prepare data for submission
            5.1: Create a FormData object
            5.2: Append the file (cover image file) to the FormData object
            5.3: Format publishedDate to YYYY-MM-DD
            5.4: Append the book object to the FormData object
        6. Send data to the API
        7. Handle API response and potential errors
        8. Display a success message and navigate to a different route
     */

     // Step 1: Check if the form is valid
     if (
            validateRequired(getFileName()) == true &&
            validateRequired(book.value.title) == true &&
            validateRequired(book.value.price) == true &&
            validateRequired(book.value.isbn) == true &&
            validateRequired(book.value.pageCount) == true &&
            validateRequired(book.value.publishedDate) == true  &&
            validateRequired(book.value.shortDescription) == true   &&
            validateRequired(book.value.author) == true 
        ) {

            // Step 2: Display a confirmation dialog to ensure the user's intention
            Swal.fire({
                icon: "info",
                text: "ต้องการเพิ่มข้อมูลหนังสือเล่มนี้ ใช่ หรือ ไม่",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "ใช่ ต้องการเพิ่มข้อมูลหนังสือเล่มนี้",
                cancelButtonText: "ไม่ต้องการ"
            }).then(async (result) => { 

                // Step 3: Handle user confirmation
                if (result.value) { // <-- if confirmed
                    
                    // Step 4: Check if a file has been selected
                    if (file.value !== null) {

                        // Step 5: Prepare data for submission
                        // 5.1: Create a FormData object
                        // Add Code
                        const formData = new FormData();

                        // 5.2: Append the file (cover image file) to the FormData object
                        // Add Code
                        formData.append("files", file.value);

                        // 5.3: Format publishedDate to YYYY-MM-DD
                        // Add Code
                        book.value.publishedDate = moment(String(book.value.publishedDate)).format('YYYY-MM-DD');

                        // 5.4: Append the book object to the FormData object
                        // Add Code
                        formData.append("book", JSON.stringify(book.value));


                        try {

                            // Step 6: Send data to the API
                            // Add Code
                            const apiUrl=import.meta.env.VITE_API_URL+'/books'
                            
                            const {response,error}=await axios.post(apiUrl , formData, {
                            headers: { Authorization: `Bearer ${token}` },
                            });

                             // Step 7: Handle API response and potential errors
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
                                // Step 8: Display a success message and navigate to a different route
                                Swal.fire({
                                    icon: "success",
                                    title: "เพิ่มหนังสือใหม่สำเร็จ",
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(async (result) => {
                                    if (result.dismiss === Swal.DismissReason.timer) {
                                        await router.push({ path: "/admin" })
                                    }
                                })                      

                            }

                            return response.data

                        } catch (err) {
                            console.log(err)
                            this.message = err.response.data.error
                            return null
                        }
                    } else {
                        console.log("No file selected")
                        return null
                    }
                    

                }
     

            })


    }

    
}
</script>

<style  scoped>

</style>