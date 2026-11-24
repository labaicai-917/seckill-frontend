<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const username = computed(() => (route.path === '/login' ? '' : localStorage.getItem('username') || ''))

const logout = () => {
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <div class="brand">秒杀商城</div>
    <nav v-if="username" class="nav-links">
      <router-link to="/products">商品列表</router-link>
      <router-link to="/orders">我的订单</router-link>
    </nav>
    <div v-if="username" class="user-area">
      <span>当前用户：{{ username }}</span>
      <button class="btn btn-plain" @click="logout">退出</button>
    </div>
  </header>
  <router-view />
</template>
