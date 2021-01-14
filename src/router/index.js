import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/home')
const Category = () => import('../views/category/category')
const Cart = () => import('../views/cart/cart')
const Me = () => import('../views/me/me')

// 直接修改原型避免出现link指向相同route时的警告问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
};


Vue.use(VueRouter)

const routes = [
  {
   path: '/',
   redirect: "/home" 
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/me',
    component: Me
  }
]


const router = new VueRouter({
  routes,
  mode: "history"
})

export default router