<template>
    <div class=" mx-auto">
        
        <div class="container-fluid mt-4">
            <div class="d-flex justify-content-end">
                <router-link to='/orderhistory' class="btn btn-secondary"><i class="bi bi-caret-left"></i> กลับไปยังหน้าประวัติการสั่งซื้อ</router-link>
            </div>
            <div class="row justify-content-center mt-5">
                
                <div class="col-lg-9">
                    <h2 class="mb-3 fw-bold">รายละเอียดการสั่งซื้อสินค้า</h2>
                    
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="firstName" class="form-label fw-bold">ชื่อ: </label>
                                {{ order?.name  }}
                            </div>
                            <div class="col-md-6">
                                <label for="lastName" class="form-label fw-bold">วันที่สั่งซื้อ: </label>
                                {{ dayMonthYear(order?.datetime) }} 
                            </div>
                            
                            <div class="col-12">
                                <label for="address" class="form-label fw-bold">ที่อยู่จัดส่งสินค้า: </label>

                               
                            </div>
                            <div class="col-9 text-wrap ">
                              
                                 {{ order?.address}} 
                               
                            </div>

                        </div>
                    
                </div>
            </div>

        </div>


    </div>

    <div class="col-lg-9 mx-auto">

        <div class="container-fluid mt-5">
            <h2 class="fw-bold mb-4 mt-2">รายการหนังสือที่สั่งซื้อ</h2>
            <div class="row mt-4">
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
                                
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="orderDetails.length>0" v-for="(item,index) in orderDetails" :key="item.orderId">
                                        <td>{{index+1}}</td> 
                                        <td>
                                            {{item.title}}
                                        </td>
                                        <td class="text-end">
                                           
                                            <span class="mx-2">
                                                {{ item.qty }}
                                            </span>
                                          
                                        </td>
                                        <td class="text-end">
                                            {{ Intl.NumberFormat('en-US').format(item.price) }} ฿
                                        </td>
                                        <td class="text-end">
                                            {{  Intl.NumberFormat('en-US').format(item.price * item.qty) }} ฿
                                        </td>
                                       
                                    </tr>
                                    <tr v-if="orderDetails.length>0">
                                        <th colspan="4" class="text-end">
                                            รวมเป็นเงินทั้งหมด
                                        </th>
                                        <td colspan="1" class="text-end">
                                            <span class="fw-bold">
                                                {{ Intl.NumberFormat('en-US').format(orderDetails.reduce((acc,item) => acc += item.price * item.qty,0) ) }} ฿
                                            </span>
                                        </td>
                                    
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
            
           
        </div>

    </div>

    
    
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import {  ref,onMounted } from 'vue'
    import axios from "axios";

    import { useCookies } from "vue3-cookies";


    const route = useRoute()
    let id = Number(route.params.id)


        
    // use cookie
    const { cookies } = useCookies()
    const token=cookies.get('token')


    const order=ref(null)
    const orderDetails=ref([])

    const apiUrl=import.meta.env.VITE_API_URL+'/orders/order/'+id
    onMounted(async () => {

        const response = await axios.get(apiUrl ,{ headers:{ Authorization: 'bearer ' + token } })
       
        order.value=response.data.data[0]
        orderDetails.value=order.value.orderDetail

        console.log(order.value)
        console.log(orderDetails.value)
        
    })


    function dayMonthYear(value){
        const date=new Date(value)
        const result = date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        return  result;
    }
</script>

<style  scoped>

</style>