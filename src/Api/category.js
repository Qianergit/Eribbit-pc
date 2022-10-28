// 分类相关api接口函数
import request from '@/utils/request'
export const findAllCatory = () => {
    return request('/home/category/head', 'get')
}