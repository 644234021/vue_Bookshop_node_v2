import {defineStore} from 'pinia'
import Swal from 'sweetalert2'
import {ref} from 'vue'

export const useShoppingStore = defineStore('shopping', () => {


    const cartItems=ref([])


    function addToCart(item) {
        // Add code : Add to cart
        const index = cartItems.value.findIndex((book) => book.bookid === item.bookid)
        if (index !== -1) {
            cartItems.value[index].quantity += 1
            Swal.fire({
                icon: 'success',
                title: `"${item.title}" ถูกปรับปรุงข้อมูลในตระกร้าสินค้า`,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            item.quantity = 1
            cartItems.value.push(item)
            Swal.fire({
                icon: 'success',
                title: `"${item.title}" ถูกเพิ่มไปยังตระกร้าสินค้า`,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    function clearCart(){
        cartItems.value=[]
    }


    // Increment Quantity
    function incrementQ(item) {
        // Add code : Increment Quantity
        let index = cartItems.value.findIndex((book) => book.bookid === item.bookid)
        if(index !== -1) {
            cartItems.value[index].quantity += 1
        }
    }


    // Decrement Quantity
    function decrementQ(item) {
        // Add code : Decrement Quantity
        let index = cartItems.value.findIndex((book) => book.bookid === item.bookid)
        if(index !== -1) {
            if(cartItems.value[index].quantity > 1){
                cartItems.value[index].quantity -= 1
            }
        }
    }


    // Remove Item from Cart
    function removeFromCart(item) {
        // Add code : Remove Item from Cart
        cartItems.value = cartItems.value.filter((book) => book.bookid !== item.bookid)

    }
  
    return { cartItems, addToCart, incrementQ, decrementQ,removeFromCart,clearCart }
  })
