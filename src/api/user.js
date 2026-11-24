import axios from 'axios'

// 部署到 ECS 时，把这里的 localhost 改成服务器公网 IP，例如 http://124.70.49.26:8080
export const BASE_URL = 'http://localhost:8080'

const request = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000
})

// 后端统一返回 { code, message, data }，直接取 body
request.interceptors.response.use(
  (response) => response.data,
  () => ({ code: 500, message: '无法连接后端服务，请确认后端已启动', data: null })
)

export const register = (username, password) =>
  request.post('/user/register', { username, password })

export const login = (username, password) =>
  request.post('/user/login', { username, password })

export const getProfile = (username) =>
  request.get('/user/profile', { params: { username } })

export const getProducts = () => request.get('/product/list')

export const getProduct = (id) => request.get(`/product/${id}`)

export const createProduct = (data) => request.post('/product/create', data)

export const seckill = (username, productId) =>
  request.post('/order/seckill', { username, productId })

export const getOrders = (username) =>
  request.get('/order/list', { params: { username } })

export const cancelOrder = (id) => request.post(`/order/cancel/${id}`)
