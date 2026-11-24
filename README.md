# seckill-frontend

在线秒杀系统前端，Vue 3 + Vite + Vue Router + Axios。

## 目录结构

```
src
├── main.js              入口
├── App.vue              顶部导航与退出登录
├── style.css            全局样式
├── api/user.js          所有接口请求（BASE_URL 在这里改）
├── router/index.js      路由与登录校验
└── views
    ├── Login.vue        登录 / 注册
    ├── ProductList.vue  商品列表（管理员可发布秒杀活动）
    ├── ProductDetail.vue 商品详情与秒杀下单
    └── OrderList.vue    我的订单与取消订单
```

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173 ，需要先启动后端（默认 http://localhost:8080）。

## 修改后端地址

打开 `src/api/user.js`，把第一行的 `BASE_URL` 改成后端地址：

```js
export const BASE_URL = 'http://localhost:8080'
```

部署到 ECS 时改成 `http://<ECS 公网 IP>:8080`。

## 构建

```bash
npm run build
```

产物在 `dist/` 目录，复制到 Nginx 的站点目录即可：

```bash
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

## 管理员账号

用用户名 `admin` 注册并登录后，商品列表页会出现“创建秒杀活动”表单。
