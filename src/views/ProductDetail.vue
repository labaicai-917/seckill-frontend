<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProduct, seckill } from '../api/user'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const message = ref('')
const messageOk = ref(false)
const submitting = ref(false)

const load = async () => {
  const res = await getProduct(route.params.id)
  if (res.code === 200) {
    product.value = res.data
  } else {
    messageOk.value = false
    message.value = res.message
  }
}

const buy = async () => {
  const username = localStorage.getItem('username')
  if (!username) {
    router.push('/login')
    return
  }
  submitting.value = true
  const res = await seckill(username, product.value.id)
  submitting.value = false
  if (res.code !== 200) {
    messageOk.value = false
    message.value = res.message
    return
  }
  messageOk.value = true
  message.value = '秒杀成功，订单已生成'
  load()
}

onMounted(load)
</script>

<template>
  <main class="page">
    <router-link class="back" to="/products">← 返回商品列表</router-link>

    <div v-if="product" class="card detail-card">
      <h2>{{ product.name }}</h2>
      <p class="desc">{{ product.description }}</p>
      <p class="price-line">
        <span class="price">秒杀价 ￥{{ product.seckillPrice }}</span>
        <span class="origin-price">原价 ￥{{ product.price }}</span>
      </p>
      <p class="stock">剩余库存：{{ product.stock }}</p>
      <button class="btn btn-danger" :disabled="submitting || product.stock <= 0" @click="buy">
        {{ product.stock > 0 ? '立即秒杀' : '已售完' }}
      </button>
      <p v-if="message" class="tip" :class="{ 'tip-ok': messageOk }">{{ message }}</p>
    </div>
    <div v-else class="empty">商品不存在或已下架</div>
  </main>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 16px;
  font-size: 14px;
  color: #4e5969;
}

.detail-card h2 {
  margin: 0 0 12px;
  font-size: 22px;
}

.desc {
  margin: 0 0 16px;
  font-size: 14px;
  color: #4e5969;
}

.price-line {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 0 0 12px;
}

.price {
  font-size: 24px;
}

.stock {
  margin: 0 0 20px;
  font-size: 14px;
  color: #4e5969;
}
</style>
