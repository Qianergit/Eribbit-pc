// 用户模块

export default {
    namespaced: true,
    state() {
        return {
            profile: { // 用户信息
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: ''
            }
        }
    },
    mutations: {
        setUser(state, payload) {
            state.profile = payload
        }
    }
}