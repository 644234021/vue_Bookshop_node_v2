<template>
    
    <div class="row my-3  mx-auto">
        <h2 class="fw-bold mb-4 mt-4">รายการสินค้าที่สั่งซื้อ</h2>
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                            
                                <th>ชื่อผู้สั่งซื้อ</th>
 
                                <th class="text-start">ที่อยู่</th>
                                <th class="text-center">ราคารวม</th>
                                <th class="text-center">วันที่ทำการสั่งซื้อ</th>
                                <th class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ord in orders" :key="ord.orderId">
                             
                                
                                <td style="width:15%">
                                    {{ord.name }}
                                </td>
                                
                                <td class="text-start">
                                    {{ ord.address }}
                                </td>
                                <td class="text-center">
                                   
                                   {{ Intl.NumberFormat('en-US').format(ord.total) }}
                                  
                               </td>
                               <td class="text-center">
                                   
                                {{ dayMonthYear(ord.datetime) }}
                             
                               </td>
                               <td style="width:50px" >
                                    <router-link :to="{ name: 'OrderDetail', params: { id: ord.orderId }}">
                                        <i class="bi bi-card-list text-primary" ></i>
                                    </router-link>
                                </td>
                         
                            </tr>
      

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script setup >

    import { ref, onMounted,computed } from 'vue'
    import { useCookies } from "vue3-cookies";

  // Add Code : import axios
  import axios from "axios"

    // use cookie
    const { cookies } = useCookies()
    const token=cookies.get('token')
    const userid=cookies.get('userid')

    const orders=ref([])

    const apiUrl=import.meta.env.VITE_API_URL+'/orders/user/'+userid



    onMounted(async () => {

        // Add Code : Send data to API (Order Data)
        const response = await axios.get(apiUrl,{ headers:{ Authorization: 'bearer ' + token } });
        orders.value =  response.data.data

       
    })



    function  dayMonthYear(value){
        const date=new Date(value)
        const result = date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        return  result;
    }










</script>

<style>
    i{
        cursor: pointer;
    }
</style>
