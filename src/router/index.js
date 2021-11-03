import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import('../views/Register.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: ()=> import('../views/Person.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ()=> import('../views/Shop.vue')
  },
  {
    path: '/detail',
    name: 'BookDetail',
    component: ()=> import('../components/BookDetail.vue')
  },
  {
    path: '/cart',
    name: 'ShoppingCart',

    component: ()=> import('../views/ShoppingCart.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: ()=> import('../views/Payment.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: ()=> import('../components/AddressPicker')
  },
  {
    path: '/complete',
    name: 'Complete',
    component: ()=> import('../views/PayComplete')
  },
  {
    path: '/addBook',
    name: 'AddBook',
    component: ()=> import('../views/AddBook')
  },
  {
    path: '/order',
    name: 'Order',
    component: ()=> import('../views/Order')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: ()=> import('../views/Admin'),
    children:[
      {
        path: '/productManagement',
        name: 'ProductManagement',
        component: ()=> import('../views/ProductManagement')
      },
      {
        path: '/hotBookList',
        name: 'HotBookList',
        component: ()=> import('../views/HotBookList')
      },
      {
        path: '/orderManagement',
        name: 'OrderManagement',
        component: ()=> import('../views/OrderManagement')
      },
      {
        path: '/broadcastManagement',
        name: 'BroadcastManagement',
        component: ()=> import('../views/BroadcastManagement')
      },
      {
        path: '/userManagement',
        name: 'UserManagement',
        component: ()=> import('../views/UserManagement')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
