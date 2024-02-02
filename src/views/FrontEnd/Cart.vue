<template>
    <h2 class="fw-bold mb-4 mt-2">ตะกร้าสินค้า</h2>
    <div class="row my-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead v-if="store.cartItems.length>0">
                            <tr>
                                <th>#</th>
                                <th>ภาพหนังสือ</th>
                                <th>ชื่อหนังสือ</th>
                                <th class="text-end">จำนวน</th>
                                <th class="text-end">ราคาต่อชิ้น</th>
                                <th class="text-end">ราคารวม</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Modify Code : Add v-if and v-for to show cart items -->
                            <tr v-if="store.cartItems.length>0" v-for="(item,index) in store.cartItems" :key="item.id">
                                <td>{{index+1}}</td>
                                <td>
                                    <img :src="apiUrl+'books/cover'+item.bookid"
                                        class="fluid rounded" 
                                        width="100" 
                                        :alt="item.title" />
                                </td>
                                <td>
                                    {{item.title}}
                                </td>
                                <td class="text-end">
                                    <!-- Modify Code : call decremenntQ -->
                                    <i class="bi bi-caret-down" @click="store.decrementQ(item)" ></i>
                                    <span class="mx-2">
                                        {{ item.quantity }}
                                    </span>
                                    <!-- Modify Code : call incrementQ -->
                                    <i  class="bi bi-caret-up" @click="store.incrementQ(item)" ></i>
                                </td>
                                <td class="text-end">
                                    {{ Intl.NumberFormat('en-US').format(item.price) }} ฿
                                </td>
                                <td class="text-end">
                                    {{  Intl.NumberFormat('en-US').format(item.price * item.quantity) }} ฿
                                </td>
                                <td style="width:50px">
                                    <!-- Modify Code : call remove -->
                                    <i class="bi bi-trash text-danger" @click="store.removeFromCart(item)" ></i>
                                </td>
                            </tr>
                            <!-- Modify Code : add v-if to show total -->
                            <tr v-if="store.cartItems.length>0">
                                <th colspan="5" class="text-end">
                                    รวมเป็นเงินทั้งหมด
                                </th>
                                <td colspan="1" class="text-end">
                                    <span class="fw-bold">
                                        {{ Intl.NumberFormat('en-US').format(  store.cartItems.reduce((acc,item) => acc += item.price * item.quantity,0) ) }} ฿
                                    </span>
                                </td>
                               
                            </tr>
                            <!-- Modify Code : add v-if to show empty cart -->
                            <tr v-if="store.cartItems.length<=0" >
                                <td colspan="7"  class="text-center fw-bold text-danger" >
                                    <h3 class="m-5 p-5">
                                        ไม่มีสินค้าในตะกร้า
                                    </h3>
                                    
                                </td>
                            </tr>

                            <tr>
                                <td colspan="3" class="text-start"><router-link to='/' class="btn btn-secondary"><i class="bi bi-caret-left"></i> กลับหน้าหลัก</router-link></td>
                                <!-- Modify Code : blind class to disable button when cart is empty -->
                                <td colspan="4" class="text-end"><router-link to='/placeorder'  class="btn btn-success" :class="store.cartItems.length<=0 ? 'disabled' : ''"><i class="bi bi-paypal"></i> สั่งซื้อหนังสือ</router-link></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >
    



    // Add Code : import useShoppingStore
    import { useShoppingStore} from '@/stores/index'

    // Add Code : declare store
    const store = useShoppingStore()




    const apiUrl=import.meta.env.VITE_API_URL
</script>

<style>
    i{
        cursor: pointer;
    }
</style>