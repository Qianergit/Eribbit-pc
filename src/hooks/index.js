// 提供复用逻辑的函数（钩子）
// 数据懒加载的函数
/* 
{object}target - dom对象
{Function} apiFn API函数

*/
import {ref} from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export const useLazytData=(target,apiFn)=>{
    const result = ref([])
    // stop是停止监测
   const{stop}= useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
        //  isIntersecting是否进入可视区
        if(isIntersecting){
            stop()
            // 调用api函数获取数据
            apiFn().then(data=>{
                console.log(data)
                result.value=data.result
            })
        }
        // 第三个参数是管可视触发大小的
        
      },
      {
        threshold:0
    }
   )
   return result
}