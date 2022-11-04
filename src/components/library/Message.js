// 提供一个能够显示xtx-message组件的函数
// 这个函数将来导入直接使用，也可以挂载到vue实例的原型上
// import Message from 'message.js' 使用message（{type：'error',text:'提示消息'}）
import XtxMessage from './xtx-message.vue'
import {createVNode,render,} from 'vue'
// DOM容器
const div=document.createElement('div')
div.setAttribute('class','xtx-message-container')
document.body.appendChild(div)

// 定时器表示
let timer =null
export default({type,text})=>{
    // 渲染组件
    // 1.需要导入消息提示组件
    // 2.将导入的消息提示组件编译为虚拟节点
    // 3.准备一个装在消息提示组件的容器
    // 4.将虚拟节点渲染到容器中
    // createVNode(组件，参数（props）)
    const vnode = createVNode(XtxMessage,{type,text})
    // 创建一个组件的dom容器
    // 再把vnode插入到上面创建的dom中
    // rander(虚拟节点，dom容器)这个方法可以把节点放入dom中
     render(vnode,div)
     clearTimeout(timer)
     timer = setTimeout(()=>{
        render(null,div)
     },3000)
}