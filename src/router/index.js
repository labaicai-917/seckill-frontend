import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/Login.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import OrderList from '../views/OrderList.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/login', component: Login },
  { path: '/products', component: ProductList },
  { path: '/product/:id', component: ProductDetail },
  { path: '/orders', component: OrderList }
]

const router = createRouter({
  // hash 模式，静态部署到 Nginx 时刷新页面不会 404
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const username = localStorage.getItem('username')
  if (to.path !== '/login' && !username) {
    return '/login'
  }
  if (to.path === '/login' && username) {
    return '/products'
  }
  return true
})

export default router
