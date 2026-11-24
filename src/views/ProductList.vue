<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { createProduct, getProducts } from '../api/user'

const products = ref([])
const loading = ref(false)
const message = ref('')
const messageOk = ref(false)
const username = localStorage.getItem('username') || ''
const isAdmin = computed(() => username === 'admin')

const form = reactive({
  name: '',
  description: '',
  price: '',
  seckillPrice: '',
  stock: ''
})

const load = async () => {
  loading.value = true
  const res = await getProducts()
  loading.value = false
  if (res.code === 200) {
    products.value = res.data
  } else {
    messageOk.value = false
    message.value = res.message
  }
}

const submit = async () => {
  message.value = ''
  const res = await createProduct({
    name: form.name,
    description: form.description,
    price: Number(form.price),
    seckillPrice: Number(form.seckillPrice),
    stock: Number(form.stock)
  })
  if (res.code !== 200) {
    messageOk.value = false
    message.value = res.message
    return
  }
  messageOk.value = true
  message.value = '秒杀活动创建成功'
  form.name = ''
  form.description = ''
  form.price = ''
  form.seckillPrice = ''
  form.stock = ''
  load()
}

onMounted(load)
</script>

<template>
  <main class="page">
    <h2 class="page-title">秒杀好物</h2>

    <section v-if="isAdmin" class="card admin-card">
      <h3>管理员：创建秒杀活动</h3>
      <div class="admin-form">
        <label class="field">
          <span>商品名称</span>
          <input v-model="form.name" type="text" placeholder="例如：华为 Mate 60 Pro" />
        </label>
        <label class="field">
          <span>商品描述</span>
          <input v-model="form.description" type="text" placeholder="一句话描述" />
        </label>
        <label class="field">
          <span>原价（元）</span>
          <input v-model="form.price" type="number" min="0" step="0.01" />
        </label>
        <label class="field">
          <span>秒杀价（元）</span>
          <input v-model="form.seckillPrice" type="number" min="0" step="0.01" />
        </label>
        <label class="field">
          <span>秒杀库存</span>
          <input v-model="form.stock" type="number" min="1" />
        </label>
        <button class="btn btn-danger" @click="submit">发布活动</button>
      </div>
      <p v-if="message" class="tip" :class="{ 'tip-ok': messageOk }">{{ message }}</p>
    </section>

    <p v-if="loading" class="empty">加载中...</p>
    <p v-else-if="products.length === 0" class="empty">暂无秒杀商品</p>

    <div v-else class="product-grid">
      <article v-for="item in products" :key="item.id" class="card product-card">
        <h3>{{ item.name }}</h3>
        <p class="desc">{{ item.description }}</p>
        <p class="price-line">
          <span class="price">￥{{ item.seckillPrice }}</span>
          <span class="origin-price">￥{{ item.price }}</span>
        </p>
        <p class="stock">剩余库存：{{ item.stock }}</p>
        <router-link class="btn" :to="`/product/${item.id}`">查看详情</router-link>
      </article>
    </div>
  </main>
</template>

<style scoped>
.page-title {
  margin: 8px 0 20px;
  font-size: 22px;
}

.admin-card {
  margin-bottom: 20px;
}

.admin-card h3 {
  margin: 0 0 16px;
  font-size: 16px;
}

.admin-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 16px;
  align-items: end;
}

.admin-form .btn {
  height: 38px;
  margin-bottom: 14px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.product-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.desc {
  margin: 0 0 12px;
  min-height: 20px;
  font-size: 13px;
  color: #86909c;
}

.price-line {
  margin: 0 0 8px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price {
  font-size: 20px;
}

.stock {
  margin: 0 0 14px;
  font-size: 13px;
  color: #4e5969;
}

@media (max-width: 760px) {
  .product-grid,
  .admin-form {
    grid-template-columns: 1fr;
  }
}
</style>
