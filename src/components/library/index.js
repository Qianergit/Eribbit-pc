// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法vue3中没有全局过滤器
// 插件
// vue2插件要素：导出一个对象。有install函数默认导入了vue构造函数
// vue3插件要素：导出一个对象。有install函数默认导入了app应用实例
import XtxSkeleton from './xtx-skeleton'
import XtxCarousel from './xtx-carousel'
import XtxMore from './xtx-more'
import defaultImg from '@/assets/images/200.png'
export default {
    install(app) {
        // 在app上面进行拓展，app提供component directive方法
        app.component(XtxSkeleton.name, XtxSkeleton)
        app.component(XtxCarousel.name,XtxCarousel)
        app.component(XtxMore.name,XtxMore)
        // 定义一个指令
        defineDirective(app)
    }
}
const defineDirective=(app)=>{
    // 图片懒加载指令 v-lazy
    // 原理 先存储图片地址不能再src上，当图片进入可视区将存储图片的地址设置给元素即可
    app.directive('lazy',{
        // vue2.0中监听使用指令的dom是否创建好，钩子函数为inserted
        // vue3.0中指令拥有的钩子函数和组件的一样 mounted(){}
        mounted(el,binding){
            // 创建一个观察对象来观察当前使用指令的元素
            const observe = new IntersectionObserver(([{isIntersecting}])=>{
                if(isIntersecting){
                //    停止观察
                 observe.unobserve(el)
                //  把指令的值设置给el的src属性 binding.value就是指令的值binding是个对象
                // 4.处理图片加载失败
                el.onerror=()=>{
                    el.src = defaultImg
                }
                el.src=binding.value
                }
            },{
                threshold:0
            })
            // 开启观察
            observe.observe(el)
        }
    })
}