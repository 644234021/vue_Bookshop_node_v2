

<template>
<!-- Ref Template : https://dev.to/codeply/bootstrap-5-sidebar-examples-38pb -->
  <div class="container-fluid mb-5">
    <div class="row flex-nowrap min-vh-100">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
        
      <router-link 
      class="navbar-brand fs-5 text-light my-3 fw-bold d-flex flex-column align-items-center  align-items-sm-center " to="/admin"
        ><i class="bi bi-book fs-1 text-white mx-2 mt-1"></i> <span class="ms-1 d-none d-sm-inline"> ComSci Book Shop </span></router-link>
        <div
          class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white"
        >
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start "
            id="menu"
          >
            
            <li>
              <router-link
                to="/admin"
                class="nav-link px-0 align-middle"
                :class="{'text-info' : (path==='/admin'),'text-white' : (path!=='/admin')}"
              >
                <i class="fs-4 bi bi-book-half"></i>
                <span class="ms-1 d-none d-sm-inline">ข้อมูลหนังสือ</span></router-link
              >
              
            </li>
            <li>
              <router-link
                to="/admin/author"
                class="nav-link px-0 align-middle"
                :class="{'text-info' : (path==='/admin/author'),'text-white' : (path!=='/admin/author')}"
              >
                <i class="fs-4 bi bi-person-badge-fill"></i>
                <span class="ms-1 d-none d-sm-inline">ข้อมูลผู้แต่ง</span>
              </router-link>
              
            </li>
            <li>
              <router-link 
                to="/admin/user"
                class="nav-link px-0 align-middle"
                :class="{'text-info' : (path==='/admin/user'),'text-white' : (path!=='/admin/user')}"
                >
                <i class="fs-4 bi-people"></i>
                <span class="ms-1 d-none d-sm-inline">ข้อมูลผู้ใช้งาน</span>
              </router-link>
            </li>
          </ul>
          <hr />
          <div class="dropdown pb-4">
            <button
              type="button"
              class="bg-dark btn btn-link nav-link text-light mt-1 btn btn-dark"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                style="width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  display: inline-block; "
                class="m-0 bg-info text-dark fw-bold"
              >
                {{ email_abbrev }}
              </div>
              <span class="d-none d-sm-inline mx-1">ผู้ดูแลระบบ</span>
            </button>

            <ul
              class="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a class="dropdown-item" href="#" @click="logout()"
                  >ออกจากระบบ</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col mb-5">
        <div class="p-3">
          <router-view></router-view>
        </div>
      </div>
     
    </div>

  </div>
  <!--  <div class="my-5 p-3">
        <router-view></router-view>
    </div> -->
  <Footer/>

</template>

<script setup>
import Footer from "@/layouts/BackEnd/Footer.vue";

import { onMounted, computed } from "vue";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";

import Swal from "sweetalert2";

// use cookie
const { cookies } = useCookies();
const token = cookies.get("token");
const is_admin = cookies.get("is_admin");
const email_abbrev = cookies.get("email_abbrev");

// userRoute() for redirect
const router = useRouter();

onMounted(async () => {
  
  
  if (token === null || is_admin=== null) {
    await router.push({ path: "/admin/login" });
  }
});

const path = computed(() =>router.currentRoute.value.path)

async function logout() {
  Swal.fire({
    icon: "info",
    text: "ต้องการออกจากระบบ ใช่ หรือ ไม่",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "ใช่ ต้องการออกจากระบบ",
    cancelButtonText: "ไม่ต้องการ",
  }).then((result) => {
    if (result.value) {
      // <-- if confirmed

      Swal.fire({
        icon: "success",
        title: "ออกจากระบบสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(async (result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          cookies.remove("token");
          cookies.remove("is_admin");
          cookies.remove("userid");
          cookies.remove("email_abbrev");
          await router.push({ path: "/admin/login" });
        }
      });
    }
  });
}
</script>

<style scoped>
.select-highlight {
  position: absolute;
  right: 0;
  top: 5px;
  height: 30px;
  width: 4px;
  background-color: #4bcffa;
  transition: 0.1s top ease-out;
}
#navside {
  position: fixed;
  width: 200px;
  z-index: 1000;
  left: 0;
  top: 0;
  border-right: 1px solid #162636;
  height: 100%;
}
</style>
