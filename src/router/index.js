import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []
    // vue 2.0中 new VueRouter({}) 创建路由实例
    // vue3.0 中 createRouter（{}）创建路由实例
const router = createRouter({
    // 使用hash的路由模式
    history: createWebHashHistory(),
    routes
})

export default router