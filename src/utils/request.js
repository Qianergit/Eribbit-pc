import axios from 'axios'
import store from '../store/index'
import router from '@/router'
const instance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
    timeOut: '5000'
})
instance.interceptors.request.use(config => {
    const { token } = store.state.user.profile
    if (token) {
        config.headers.Authoriztion = `Bearer ${token}`
    }
    return config
}, err => Promise.reject(err))
instance.interceptors.response.use(res => res.data, err => {
    if (err.response && err.response.status === 401) {
        store.commit('user/setUser', {})
        const fullPath = encodeURLComponent(router.currentRoute.value.fullPath)
        router.push('./login?redirectUrl=' + fullPath)
    }
})
export default (url, method, submitData) => {
    console.log(method)
    return instance({
        url,
        method,
        // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
        // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
        // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
        // method参数：get,Get,GET  转换成小写再来判断
        // 在对象，['params']:submitData ===== params:submitData 这样理解
        [method === 'get' ? 'params' : 'data']: submitData
    })
}