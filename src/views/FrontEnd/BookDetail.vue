<template>
    <div class="row mt-4">
        <div class="col-md-4">
            <img :src="apiUrlImage+'/books/cover/'+book?.bookid" class="card-img-top rounded" alt="..." />
        </div>
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-8 mt-3">
                    <h2 class="fw-bold mb-4">{{ book?.title }}</h2>
                </div>
                <div class="col-md-4 text-end">
                    <router-link to='/' class="btn btn-secondary"><i class="bi bi-caret-left"></i> กลับหน้าหลัก</router-link>
                </div>
            </div>
            
            <h4 class="fw-bold card-text mb-3  text-danger">{{ book?.author }}</h4>
            <p style="white-space: pre-line">{{ book?.shortDescription }}</p>
            <h5 class="fw-bold text-success">ข้อมูลหนังสือ</h5>
            <div><b>ISBN</b> : {{ book?.isbn  }}</div>
            <div><b>จำนวนหน้า</b> : {{ book?.pageCount  }}</div>
            <div><b>พิมพ์เมื่อ</b> : {{ monthYear  }}</div>
            
           <div class="row mt-4">
            <div class="col text-start">
                <h5 class="card-text text-primary fw-bold">ราคา: {{ book?.price }} ฿</h5>
        
            </div>
            <div class="col text-end">
                <button class="btn btn-primary"  @click="store.addToCart(book)">
                    <i class="bi bi-cart-check"></i> เพิ่มลงรถเข็น
                </button>
            </div>
           </div>
            
                    
           
            
        </div>
    </div>
</template>
<script setup >
    import { useRoute } from 'vue-router'
    import {  ref,computed,onMounted } from 'vue'
    

    import { useCookies } from "vue3-cookies";

    

    import { useShoppingStore} from '@/stores/index'

    // Add Code : import axios
    import axios from "axios"

    const store = useShoppingStore()

    const route = useRoute()
    let id = Number(route.params.id)

        
    // use cookie
    const { cookies } = useCookies()
    const token=cookies.get('token')

    const apiUrlImage=import.meta.env.VITE_API_URL

    //Modify Code : Declare book as null
    const book=ref(null)
    

    const apiUrl=import.meta.env.VITE_API_URL+'/books/'+id
    onMounted(async () => {

        // Add Code : Get book data
        const response = await axios.get(apiUrl ,{ headers:{ Authorization: 'bearer ' + token } })
        book.value =   response.data.data[0]
        
    })


    const monthYear=computed(()=>{
        const date=new Date(book.value?.publishedDate)
        const result = date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',

        })
        return  result;
    })
</script>
<style scoped>
</style>