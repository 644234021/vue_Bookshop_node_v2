<template>
    
    <div class="row my-3 w-75 mx-auto">
        <h2 class="fw-bold mb-4 mt-4">รายการสินค้าที่สั่งซื้อ</h2>
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อหนังสือ</th>
                                <th class="text-end">จำนวน</th>
                                <th class="text-end">ราคาต่อชิ้น</th>
                                <th class="text-end">ราคารวม</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in store.cartItems" :key="item.bookid">
                                <td>{{index+1}}</td>
                                
                                <td>
                                    {{item.title}}
                                </td>
                                <td class="text-end">
                                   
                                    {{ item.quantity }}
                                   
                                </td>
                                <td class="text-end">
                                    {{ Intl.NumberFormat('en-US').format(item.price) }} ฿
                                </td>
                                <td class="text-end">
                                    {{  Intl.NumberFormat('en-US').format(item.price * item.quantity) }} ฿
                                </td>
                         
                            </tr>
                            <tr>
                                <th colspan="4" class="text-end">
                                    รวมเป็นเงินทั้งหมด
                                </th>
                                <td colspan="1" class="text-end">
                                    <span class="fw-bold">
                                        {{  Intl.NumberFormat('en-US').format(store.cartItems.reduce((acc,item) => acc += item.price * item.quantity,0) ) }} ฿
                                    </span>
                                </td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class=" mx-auto">

        <Form @submit.prevent="submit" >
            <div class="container-fluid my-5">
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <h2 class="mb-3 fw-bold">ข้อมูลจัดส่งสินค้า</h2>
                        
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="firstName" class="form-label">ชื่อ</label>
                                    <!-- Modify Code : Add requried to validate required field -->
                                    <Field type="text" :rules="validateRequired"  v-model="firstName" class="form-control" id="firstName" name="firstName" required/>
                                    
                                    <!-- Add Code : ErrorMessage firstName -->
                                    <ErrorMessage name="firstName" class="text-danger float-end" />
                                </div>
                                <div class="col-md-6">
                                    <label for="lastName" class="form-label">นามสกุล</label>
                                    <!-- Modify Code : Add requried to validate required field -->
                                    <Field type="text" :rules="validateRequired" v-model="lastName" class="form-control" id="lastName" name="lastName" required/>
                                    
                                    <!-- Add Code : ErrorMessage lastName -->
                                    <ErrorMessage name="lastName" class="text-danger float-end" />
                                </div>
                                <div class="col-md-6">
                                    <label for="email" class="form-label">อีเมล์</label>
                                    <!-- Modify Code : Add requried to validate email -->
                                    <Field type="email" :rules="validateEmail"  v-model="email" class="form-control" id="email" name="email" required/>
                                    
                                    <!-- Add Code : ErrorMessage email -->
                                    <ErrorMessage name="email" class="text-danger float-end" />
                                </div>
                                <div class="col-md-6">
                                    <label for="phone" class="form-label">เบอร์โทรติดต่อ</label>
                                    <!-- Modify Code : Add requried to validate required field -->
                                    <Field type="text" :rules="validateRequired" v-model="phone" class="form-control" id="phone" name="phone"/>
                                    
                                    <!-- Add Code : ErrorMessage phone -->
                                    <ErrorMessage name="phone" class="text-danger float-end" />
                                </div>
                                <div class="col-12">
                                    <label for="address" class="form-label">ที่อยู่</label>

                                    <!-- Uncommend Field v-slot : Add requried to validate required field -->
                                    <Field v-slot="{ field }" name="address" v-model="address" :rules="validateRequired">

                                        <textarea v-bind="field" type="textarea" name="address"   class="form-control"  rows="5" required/>
                                        
                                    </Field>
                                    
                                    
                                    <!-- Add Code : ErrorMessage address -->
                                    <ErrorMessage name="address" class="text-danger float-end" />
                                </div>

                            </div>
                        
                    </div>
                </div>
                <div class="row justify-content-center mt-5">
                    <div class="col-lg-4 text-start">
                        <router-link to='/cart' class="btn btn-secondary"><i class="bi bi-caret-left"></i> กลับไปรับตระกร้าสินค้า</router-link>
                
                    </div>
                    <div class="col-lg-5 text-end">
                        <button  @click="placeOrder()" class="btn btn-success"><i class="bi bi-paypal"></i> ยืนยันคำสั่งซื้อ</button>
                                

                    </div>
                                        
                </div>
            </div>
            
        </Form>
       
                               





    </div>
</template>

<script setup >

    import { useShoppingStore} from '@/stores/index'
    import { ref, onMounted } from 'vue'
    import { useCookies } from "vue3-cookies";

    import Swal from 'sweetalert2'

    import { useRouter } from 'vue-router'  

    // Add Code : import 'vee-validate'
    import { Field, Form, ErrorMessage } from 'vee-validate'
    // Add Code : import axios
    import axios from "axios"
    // userRoute() for redirect
    const router = useRouter();

    const store = useShoppingStore()




    // use cookie
    const { cookies } = useCookies()
    const token=cookies.get('token')
    const userid=cookies.get('userid')


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

    function validateRequired (value) {
        return !!value || 'กรุณากรอกข้อมูลให้ครบถ้วน'
    } 




    const firstName=ref("")
    const lastName=ref("")
    const email=ref("")
    const phone=ref("")
    const address=ref("")

    async function placeOrder(){

        
        // Add Code : Check if form is valid
        if (
            validateRequired(firstName.value) == true &&
            validateRequired(lastName.value) == true &&
            validateRequired(email.value) == true &&
            validateEmail(email.value) == true &&
            validateRequired(phone.value) == true &&
            validateRequired(address.value) == true 
                ) {


            
            const apiUrl=import.meta.env.VITE_API_URL+'/orders'

            // Add Code : Send data to API (Order Data)
            const {data,error} = await axios.post(apiUrl, {
                    data: {
                            name: firstName.value + " " + lastName.value,
                            address: address.value,
                            total: store.cartItems.reduce((acc,item) => acc += item.price * item.quantity,0),
                            userId: userid,
                            details:store.cartItems
                        }
                },{ headers:{ Authorization: 'bearer ' + token } })


            // check error
            if (error != null) {

                if (error.value.status === 400) {

                    Swal.fire({
                        icon: "error",
                        title: "การสั้งซื้อไม่ผ่าน",
                        text: "กรุณาตรวจข้อมูลการสั่งซื้ออีกครั้ง",
                        confirmButtonText: "Close",
                    })

                } else {
                    console.log(error.value.status + " : " + error.value.message);
                }

            } else {

            

                Swal.fire({
                        icon: "success",
                    title: "การสั่งซื้อสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                }).then(async (result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
            
                        store.clearCart()
                        await router.push({ path: "/orderhistory" })
                    }
                })




               

            }


            

        }
        // End - Add Code : Check if valid 




    }








</script>

<style>
    i{
        cursor: pointer;
    }
</style>












