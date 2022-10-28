import { createStore } from 'vuex'
// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库createStore（{}）
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
    modules: {
        cart,
        category,
        user
    },
    plugins: [
        createPersistedState({
            // 先设置key就是本地存储的名字
            key: 'erabbit-client-pc-124-store',
            // 指定需要存储的模块
            patch: ['user', 'cart']
        })
    ]
})