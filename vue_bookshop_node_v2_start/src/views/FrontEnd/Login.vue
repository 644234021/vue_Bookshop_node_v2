<template>
     <div class="login-page bg-dark">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 offset-lg-1">
                  <h3 class="mb-3 text-white">Login Now</h3>
                    <div class="bg-white shadow rounded">
                        <div class="row">
                            <div class="col-md-7 pe-0">
                                <div class="form-left h-100 py-5 px-5">
                                    <Form @submit.prevent="submit"  class="row g-4">
                                            <div class="col-12">
                                                <label>E-mail<span class="text-danger">*</span></label>
                                                <div class="input-group">
                                                    <div class="input-group-text"><i class="bi bi-envelope"></i></div>
                                                    <!-- Modify Code : Add requried to validate email -->
                                                    <Field name="email"  type="email" :rules="validateEmail" v-model="email" class="form-control" placeholder="Enter e-mail"/>
                                                </div>
                                                <!-- Add Code : ErrorMessage email -->
                                                <ErrorMessage name="email" class="text-danger float-end" />
                                            </div>

                                            <div class="col-12">
                                                <label>Password<span class="text-danger">*</span></label>
                                                <div class="input-group">
                                                    <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                    <!-- Modify Code : Add requried to validate password length -->
                                                    <Field name="password" :rules="validatePassLen" type="password" v-model="password" class="form-control" placeholder="Enter Password"/>
                                                </div>
                                                <!-- Add Code : ErrorMessage password -->
                                                <ErrorMessage name="password" class="text-danger float-end" />
                                            </div>

                                            <div class="col-6">
                                                <button  @click="login()" class="btn btn-primary px-4 float-end w-full">login</button>
                                            </div>

                                        

                                            <div class="col-6 d-flex align-items-center">
                                                <button class="btn btn-success px-3 float-end" @click="registration()">
                                                    Registration
                                                </button>
                                                
                                            </div>
                                    </Form>
                                </div>
                            </div>
                            <div class="col-md-5 ps-0 d-none d-md-block">
                                <div class="form-right h-100 bg-dark text-white text-center pt-5">
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
import { useCookies } from "vue3-cookies";
// Add Code : import 'vee-validate'
import { Field, Form, ErrorMessage } from 'vee-validate'
// Add Code : import axios
import axios from "axios"

// use cookie
const { cookies } = useCookies()

// ref const for email and password
const email = ref("");
const password = ref("");


// userRoute() for redirect
const router = useRouter();

//Go to Registraion
async function registration(){
    await router.push({ path: "/registration" });
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



// submit form
async function   login()  {

  
  // Add Code : Check if form is valid
  if (
    validateEmail(email.value) == true &&
    validatePassLen(password.value) == true
  ) {
    

    // login  
    const apiUrl=import.meta.env.VITE_API_URL+'/users/auth/signin'
    const error=ref(null)


    // Add Code : Send data to API (Login Data)
    const {data} = await axios.post(apiUrl, {
        username: email.value,
        password: password.value,
      }).catch((err)=>{
        error.value=err
        if (err.response.status === 400 ||err.response.status === 401) {
            console.log("Login failed! Please check your email and password.");
            Swal.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
            text: "กรุณาตรวจสอบอีเมล์และรหัสผ่านของคุณ",
            showConfirmButton: false,
            timer: 1500
            })
        } 
        
      })


    
    // check error
    if (error.value === null) {

      let timerInterval;
      Swal
        .fire({
          title: "กำลังเข้าสู่ระบบ",
          html: "กรุณารอสักครู่ <b></b> วินาที",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getHtmlContainer();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft() / 1000;
                }
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        })
        .then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {

            // set token to cookie
            this.cookies.set("token",data.accessToken)
            this.cookies.set("userid",data.userId)
            this.cookies.set("email_abbrev",data.username.substring(0, 1).toUpperCase())
            
            
            // redirect to dashboard
           await router.push({ path: "/" });
          }
        });
    }



}
  // End - Add Code : Check if valid 


  
};


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

</style>