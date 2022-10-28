// 这里专门写首页相关的API
import request from '@/utils/request'

// /* 
// 获取品牌
// @param{integer} limit 品牌个数
// @returns Promise
// */
export const findBrand = (limit) => {
    return request('/home/brand', 'get', { limit })
}
export const findBanner = ()=>{ //轮播图api
    return request('/home/banner','get')
}

export const findNew = ()=>{ //获取新鲜好物的api
  return request('/home/new','get')
}

export const findHot = () => { //人气推荐
    return request('home/hot', 'get')
  }

export const findGoods = () => { //获取商品
    return request('home/goods', 'get')
  }
  export const findSpecial = () => { //最新专题
    return request('home/special', 'get')
  }
