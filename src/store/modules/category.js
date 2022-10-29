// 存储分类信息
import { topCategory } from '@/Api/contants'
import { findAllCatory } from '@/Api/category'
export default {
    namespaced: true,
    state() {
        return {
            //   分类信息集合,依赖Category重新设置，但是这里先放进来的这写是保证先不需要请求导致的空白
            list: topCategory.map(item => {
                return { name: item }
            })
        }
    },
    mutations: {
        setList(state, payload) {
            state.list = payload
        },
        open(state, id) {
            const currCategory = state.list.find(item => item.id === id)
            currCategory.open = true
        },
        hide(state, id) {
            const currCategory = state.list.find(item => item.id === id)
            currCategory.open = false
        }
    },
    actions: {
        async getList({ commit }) {
            const data = await findAllCatory()
            data.result.forEach(item => {
                item.open = false
            })
            commit('setList', data.result)
        }
    }
}