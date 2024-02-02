<template>
    <div className='row my-4'>

        <BookListItem v-for="book in books" 
            :key="book.bookid" :book="book" />

    </div>
</template>

<script setup >
    import {  ref,onMounted } from 'vue'
    import BookListItem from '@/components/FrontEnd/BookListItem.vue'

    // Add Code : import axios
    import axios from "axios"
    // Add Code : import vue3-cookies
    import { useCookies } from "vue3-cookies"


    // Modify Code : Declare books as emply array (ref)
    const books=ref([])


    // Add Code : use cookies and get token from cookies
    const { cookies } = useCookies()
    const token=cookies.get('token')


    const apiUrl=import.meta.env.VITE_API_URL+'/books'

    onMounted(async () => {

        // Add Code : Get books data
        const response = await axios.get(apiUrl,{ headers:{ Authorization: 'Bearer ' + token } });
        books.value =  response.data.data;

    })
  
</script>

<style>
</style>