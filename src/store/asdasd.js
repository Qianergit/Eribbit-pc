import { createStore } from 'vuex'
import { createPerisistedState } from 'vuex-persistedstate'

export default createStore({
    modules: {

    },
    plugins: [
        createPersistedState({
            // key
            key: '',
            // 文件地址
            patch: []
        })
    ]
})