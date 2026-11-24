<script setup>
import { onMounted, ref } from 'vue'
import { cancelOrder, getOrders } from '../api/user'

const orders = ref([])
const loading = ref(false)
const message = ref('')
const messageOk = ref(false)
const username = localStorage.getItem('username') || ''

const formatTime = (value) => (value ? value.replace('T', ' ').slice(0, 16) : '')

const load = async () => {
  loading.value = true
  const res = await getOrders(username)
  loading.value = false
  if (res.code === 200) {
    orders.value = res.data
  } else {
    messageOk.value = false
    message.value = res.message
  }
}

const cancel = async (order) => {
  const res = await cancelOrder(order.id)
  if (res.code !== 200) {
    messageOk.value = false
    message.value = res.message
    return
  }
  messageOk.value = true
  message.value = '订单已取消'
  load()
}

onMounted(load)
</script>

<template>
  <main class="page">
    <h2 class="page-title">我的订单</h2>

    <div class="card">
      <p v-if="loading" class="empty">加载中...</p>
      <p v-else-if="orders.length === 0" class="empty">还没有订单，去商品列表抢一单吧</p>
      <table v-else>
        <thead>
          <tr>
            <th>订单号</th>
            <th>商品</th>
            <th>成交价</th>
            <th>状态</th>
            <th>下单时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.productName }}</td>
            <td class="price">￥{{ order.price }}</td>
            <td>{{ order.status }}</td>
            <td>{{ formatTime(order.createTime) }}</td>
            <td>
              <button
                v-if="order.status === '已下单'"
                class="btn btn-plain"
                @click="cancel(order)"
              >
                取消订单
              </button>
              <span v-else class="muted">-</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="message" class="tip" :class="{ 'tip-ok': messageOk }">{{ message }}</p>
    </div>
  </main>
</template>

<style scoped>
.page-title {
  margin: 8px 0 20px;
  font-size: 22px;
}

.muted {
  color: #86909c;
}
</style>
