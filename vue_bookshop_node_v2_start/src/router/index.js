import { createRouter, createWebHistory } from "vue-router";
//Front-End
import Book from "@/views/FrontEnd/Book.vue";
import About from "@/views/FrontEnd/About.vue";
import Cart from "@/views/FrontEnd/Cart.vue";
import BookDetail from "@/views/FrontEnd/BookDetail.vue";
import Login from "@/views/FrontEnd/Login.vue";
import Registration from "@/views/FrontEnd/Registration.vue";
import PlaceOrder from "@/views/FrontEnd/PlaceOrder.vue";
import OrderHistory from "@/views/FrontEnd/OrderHistory.vue";
import OrderDetail from "@/views/FrontEnd/OrderDetail.vue";
import MainLayout from "@/layouts/FrontEnd/MainLayout.vue";


const routes = [
  //Front-End Pages
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/",
    name: "main",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Book",
        component: Book,
        meta: {
          title: "Book",
        },
      },

      {
        path: "/about",
        name: "About",
        component: About,
        meta: {
          title: "About",
        },
      },
      {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: {
          title: "Cart",
        },
      },
      {
        path: "/book/:id",
        name: "BookDetail",
        component: BookDetail,
        meta: {
          title: "Book Deatail",
        },
      },
      {
        path: "/placeorder",
        name: "PlaceOrder",
        component: PlaceOrder,
        meta: {
          title: "Place Order",
        },
      },
      {
        path: "/orderhistory",
        name: "OrderHistory",
        component: OrderHistory,
        meta: {
          title: "Order History",
        },
      },
      {
        path: "/orderdetail/:id",
        name: "OrderDetail",
        component: OrderDetail,
        meta: {
          title: "Order Detail",
        },
      },
    ],
  },
  // ... other paths ...
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (typeof to.meta.title == "string") {
    document.title = "ComSci Book Shop : " + to.meta.title;
  }

  next();
});

export default router;
