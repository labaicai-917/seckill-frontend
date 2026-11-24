<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '../api/user'

const router = useRouter()
const mode = ref('login')
const submitting = ref(false)
const message = ref('')
const messageOk = ref(false)
const form = reactive({ username: '', password: '' })

const switchMode = (value) => {
  mode.value = value
  message.value = ''
}

const submit = async () => {
  if (!form.username.trim() || !form.password.trim()) {
    messageOk.value = false
    message.value = '请输入用户名和密码'
    return
  }
  submitting.value = true
  const action = mode.value === 'login' ? login : register
  const res = await action(form.username.trim(), form.password.trim())
  submitting.value = false

  if (res.code !== 200) {
    messageOk.value = false
    message.value = res.message
    return
  }

  if (mode.value === 'register') {
    messageOk.value = true
    message.value = '注册成功，请登录'
    mode.value = 'login'
    return
  }

  localStorage.setItem('username', res.data.username)
  router.push('/products')
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>在线秒杀系统</h1>
      <p class="subtitle">登录后可参与秒杀活动、查看订单</p>

      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="switchMode('login')">登录</button>
        <button :class="{ active: mode === 'register' }" @click="switchMode('register')">注册</button>
      </div>

      <form @submit.prevent="submit">
        <label class="field">
          <span>用户名</span>
          <input v-model="form.username" type="text" placeholder="请输入用户名" autocomplete="username" />
        </label>
        <label class="field">
          <span>密码</span>
          <input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </label>
        <button class="btn submit" type="submit" :disabled="submitting">
          {{ submitting ? '处理中...' : mode === 'login' ? '登录' : '注册' }}
        </button>
      </form>

      <p v-if="message" class="tip" :class="{ 'tip-ok': messageOk }">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
}

.login-card {
  width: 380px;
  background: #ffffff;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  padding: 32px;
}

h1 {
  margin: 0;
  font-size: 22px;
  color: #1f2329;
}

.subtitle {
  margin: 8px 0 24px;
  font-size: 13px;
  color: #86909c;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e6eb;
}

.tabs button {
  border: none;
  background: transparent;
  padding: 10px 16px;
  font-size: 15px;
  color: #4e5969;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tabs button.active {
  color: #e1251b;
  font-weight: 600;
  border-bottom-color: #e1251b;
}

.submit {
  width: 100%;
  height: 40px;
  margin-top: 8px;
  background: #e1251b;
}
</style>
