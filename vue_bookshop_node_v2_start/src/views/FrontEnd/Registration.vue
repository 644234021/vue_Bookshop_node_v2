<template>
    <div class="login-page bg-dark">
       <div class="container">
           <div class="row">
               <div class="col-lg-10 offset-lg-1">
                 <h3 class="mb-3 text-white">Registration</h3>
                   <div class="bg-white shadow rounded">
                       <div class="row">
                           <div class="col-md-7 pe-0">
                               <div class="form-left h-100 py-5 px-5">
                                   <Form @submit.prevent="submit"  class="row g-4">
                                           <div class="col-12">
                                               <label>Username<span class="text-danger">*</span></label>
                                               <div class="input-group">
                                                   <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                                                   <!-- Modify Code : Add requried to validate required field -->
                                                   <Field name="username" type="text" v-model="username" :rules="validateRequired"  class="form-control" placeholder="Enter Username"/>
                                               </div>
                                               <!-- Add Code : ErrorMessage username -->
                                               <ErrorMessage name="username" class="text-danger float-end" />
                                           </div>

                                           <div class="col-12">
                                               <label>E-mail<span class="text-danger">*</span></label>
                                               <div class="input-group">
                                                   <div class="input-group-text"><i class="bi bi-envelope"></i></div>
                                                   <!-- Modify Code : Add requried to validate email -->
                                                    <Field name="email" type="email" :rules="validateEmail" v-model="email" class="form-control" placeholder="Enter e-mail"/>
                                                </div>
                                                <!-- Add Code : ErrorMessage email -->
                                                <ErrorMessage name="email" class="text-danger float-end" />
                                                
                                           </div>

                                           <div class="col-12">
                                               <label>Password<span class="text-danger">*</span></label>
                                               <div class="input-group">
                                                   <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                   <!-- Modify Code : Add requried to validate password length -->
                                                   <Field name="password" type="password" :rules="validatePassLen" v-model="password" class="form-control" placeholder="Enter Password"/>
                                               </div>
                                               <!-- Add Code : ErrorMessage password -->
                                               <ErrorMessage name="password" class="text-danger float-end" />
                                               
                                           </div>

                                           <div class="col-6">
                                               <button @click="register()" class="btn btn-primary px-3 float-end">
                                                   Register
                                               </button>
                                               
                                           </div>
                                           <div class="col-6">
                                               <button @click="cancel()" class="btn btn-danger px-4 float-start w-full">Cancel</button>
                                           </div>
                                   </Form>
                               </div>
                           </div>
                           <div class="col-md-5 ps-0 d-none d-md-block">
                               <div class="form-right h-100 bg-dark text-white text-center p-5">
                                   <i class="bi bi-book"></i>
                                   <h2 class="fs-1">ComSci Book Shop</h2>
                               </div>
                           </div>
                       </div>
                   </div>
                   
               </div>
           </div>
       </div>
   </div>
</template>

<script setup>

// sweetalert2
import Swal from 'sweetalert2'
import {ref} from 'vue'
import { useRouter } from 'vue-router'  
import { useCookies } from "vue3-cookies"
// Add Code : import 'vee-validate'
import { Field, Form, ErrorMessage } from 'vee-validate'
// Add Code : import axios
import axios from "axios"

// use cookie
const { cookies } = useCookies()

// ref const for email and password
const username=ref("")
const email = ref("");
const password = ref("");


// userRoute() for redirect
const router = useRouter();

//Go to Registraion
async function cancel(){
    await router.push({ path: "/login" });
}

function validateEmail(value) {
    // if the field is empty
    if (!value) {
        return 'กรุณากรอกข้อมูลอีเมล์';
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'อีเมล์ต้องอยู่ในรูปแบบที่ถูกต้อง';
    }
    // All is good
    return true;
}


function validatePassLen (value){
    return (!!value && value.length >= 6) || "รหัสผ่านต้องมี 6 อักษรขั้นไป"
}


function validateRequired (value) {
    return !!value || 'กรุณากรอกข้อมูลให้ครบถ้วน'
} 

// submit form
async function   register()  {

  
  // Add Code : Check if form is valid
  if (
    validateRequired(username.value) == true &&
    validateRequired(email.value) == true &&
    validateEmail(email.value) == true &&
    validatePassLen(password.value) == true
  ) {

    // registration 
    const apiUrl=import.meta.env.VITE_API_URL+'/users/auth/register'

    // Add Code : Send data to API (Registration Data)

    const {data,error} = await axios.post(apiUrl, {
        username: email.value,
        role: "customer",
        password: password.value,
      });

    // check error
    if (error != null) {

      if (error.value.status === 400) {

        Swal.fire({
          icon: "error",
          title: "ลงทะเบียนไม่ผ่าน",
          text: "กรุณาตรวจสอบอีเมล์และรหัสผ่านที่คุณตั้ง",
          confirmButtonText: "Close",
        })
      } else {
        console.log(error.value.status + " : " + error.value.message);
      }
    } else {

        Swal.fire({
          icon: "success",
          title: "ลงทะเบียนสำเร็จ",
          showConfirmButton: false,
            timer: 1500
        }).then(async (result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                cookies.remove('token')
                await router.push({ path: "/login" })
            }
        })
    }

}
  // End - Add Code : Check if valid 

  
}
</script>

<style  scoped>
.login-page {
   width: 100%;
   height: 100vh;
   display: inline-block;
   display: flex;
   align-items: center;
}
.form-right i {
   font-size: 90px;
}
a {
   text-decoration: none;
   color:white;
}
</style>