import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/home')
const Category = () => import('../views/category/category')
const Cart = () => import('../views/cart/cart')
const Me = () => import('../views/me/me')
const Detail = () => import('../views/detail/detail')

// 直接修改原型避免出现link指向相同route时的警告问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
};


Vue.use(VueRouter)

const routes = [
  {
   path: '/',
   redirect: "/home" ,
   meta: {
    showTab: true
  }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showTab: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      showTab: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      showTab: true
    }
  },
  {
    path: '/me',
    component: Me,
    meta: {
      showTab: true
    }
  },
  {
    // 动态路由
    // :iid是传参，意思是我要传一个名为iid的参数
    path: '/detail/:iid',
    component: Detail,
    meta: {
      showTab: false
    }
  }
]


const router = new VueRouter({
  routes,
  mode: "history"
})

export default router