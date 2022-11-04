import { createRouter, createWebHashHistory } from 'vue-router'
const Login = ()=> import ('@/views/login')
const TopCategory = () =>
    import ('@/views/category/index')
const SubCategory = () =>
    import ('@/views/category/sub')
const Goods= ()=>
     import ('@/views/Goods/index')
const routes = [{
        path: '/',
        component: () =>
            import ('@/views/Layout'),
        children: [{
                path: '/',
                component: () =>
                    import ('@/views/home')
            },
            {
                path: '/category/:id',
                component: TopCategory
            },
            {
                path: '/category/sub/:id',
                component: SubCategory
            },
            {
                path:'/product/:id',
                component:Goods
            }

        ]
    },
    {path:'/login', component:Login}
]
    // vue 2.0中 new VueRouter({}) 创建路由实例
    // vue3.0 中 createRouter（{}）创建路由实例
const router = createRouter({
    // 使用hash的路由模式
    history: createWebHashHistory(),
    scrollBehavior(){
        return {left:0,top:0}
    },
    routes
})

export default router