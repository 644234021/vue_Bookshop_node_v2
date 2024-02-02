<template>
    
    <Header/>
   
    
    <div class="my-5 p-3">
        <router-view></router-view>
    </div>
   
    
    <Footer/>
   
</template>

<script setup>
import Header from '@/layouts/FrontEnd/Header.vue';
import Footer from '@/layouts/FrontEnd/Footer.vue';
</script>

<style scoped>

</style>