// 分类相关api接口函数
import request from '@/utils/request'
export const findAllCatory = () => {
    return request('/home/category/head', 'get')
}
/**
 * 获取顶级类目信息（children属性就是各个子分类）
 * @param {String} id - 顶级类目ID
 * @returns
 */
 export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
  }

  /* 
  二级类目获取分类信息的api

  */
  export const findSubCategoryFilter = (id)=>{
    return request('/category/sub/filter', 'get', { id })
  }