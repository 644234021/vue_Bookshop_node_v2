<template>
    <nav class="navbar navbar-expand-lg bg-dark fixed-top">
        <div class="container">
            
            <router-link class="navbar-brand mt-1 fs-5 text-light" to="/"><i class="bi bi-book text-white mx-2 mt-1"></i> ComSci Book Shop</router-link>

            <button class="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="bi bi-list"></i>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav  mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :to="{ name: 'Book' }">หน้าหลัก</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :to=" { name: 'About'}">เกี่ยวกับเรา</router-link>
                    </li>
                </ul>
            </div>

            <div class="d-flex ">
                
                <span class="d-block px-2"></span>

                 
                

                <router-link class="nav-link text-light mt-1" :to="{ name: 'Cart' }"><i class="bi bi-cart-check"></i> ตระกร้าสินค้า ( {{ store.cartItems.length}} )
</router-link> 
             

                <span class="d-block px-2"></span>

                <div class="btn-group dropstart" >
                    <button type="button"   class="bg-dark btn btn-link nav-link text-light mt-1 btn btn-dark" data-bs-toggle="dropdown" aria-expanded="false">
                      
                        <div style="width:20px;height:20px;border-radius:50%;display: inline-block;" class="m-0 bg-info text-dark fw-bold"> {{ email_abbrev }} </div>
                        
    
                    </button>
                 
                    <ul class="dropdown-menu">
                        <li><router-link :to="{ name: 'OrderHistory'}" class="dropdown-item" href="#">ประวัติการสั่งซื้อ</router-link></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" @click="logout()">ออกจากระบบ</a></li>
                    </ul>
                </div>
                
                

                

            

            </div>
            
            
        </div>
    </nav>
</template>

<script setup >
    import { onMounted } from 'vue';
  

    import { useCookies } from "vue3-cookies";

    import { useRouter } from 'vue-router'  

    import Swal from 'sweetalert2'

    // Add Code : import useShoppingStore
    import { useShoppingStore} from '@/stores/index'

    // Add Code : declare store
    const store = useShoppingStore()


    // use cookie
    const { cookies } = useCookies()
    const token=cookies.get('token')
    const email_abbrev=cookies.get('email_abbrev')

    // userRoute() for redirect
    const router = useRouter();


    

    onMounted(async () => {
        if (token===null){
            await router.push({ path: "/login" });
        }
    })

    async function logout(){

        Swal.fire({
            icon: "info",
            text: "ต้องการออกจากระบบ ใช่ หรือ ไม่",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ใช่ ต้องการออกจากระบบ",
            cancelButtonText: "ไม่ต้องการ"
        }).then((result) => { 

            if (result.value) { // <-- if confirmed
                
                
                Swal.fire({
                    icon: "success",
                    title: "ออกจากระบบสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                }).then(async (result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        cookies.remove('token')
                        cookies.remove("userid")
                        cookies.remove("email_abbrev")
                        // Add Code : clear cart
                        store.clearCart()
                        await router.push({ path: "/login" })
                    }
                })



            }

        })













        
    }

</script>


<style scoped>

</style>