<template>
    <div class="xtx-numbox">
      <div class="label" v-if="lavel" >{{lavel}}</div>
      <div class="numbox">
        <a href="javascript:;" @click="changeNum(-1)">-</a>
        <input type="text" readonly :value="modelValue">
        <a href="javascript:;" @click="changeNum(1)" >+</a>
      </div>
    </div>
  </template>
  <script>
import {useVModel} from '@vueuse/core'
  export default {
    name: 'XtxNumbox',
    props:{
        label:{
            type:String,
            default:''
        },
        modelValue:{
           type:Number,
           default:1
        },
        // 最小值和最大值
        min:{
            type:Number,
            default:1
        },
        max:{
            type:Number,
            default:10
        }

    },
    setup(props,{emit}){
    //    绑定点击事件 触发同一个事件同一个函数来完成加减
    // 使用vueuse的useVModel做数据绑定，修改 count 就可以直接通知父组件更行
    const count = useVModel(props,'modelValue',emit)
    const changeNum = (step)=>{
        // 得到将要改变的值，如果值不合法终止程序运行
       const newValue = count.value + step
       if(newValue<props.min || newValue > props.max) return 
        count.value = newValue
        // 5.提供一个change事件
        emit('change',newValue)
       
    }
    return {changeNum}
    }
  }
  </script>
  <style scoped lang="less">
  .xtx-numbox {
    display: flex;
    align-items: center;
    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
    .numbox {
      width: 120px;
      height: 30px;
      border: 1px solid #e4e4e4;
      display: flex;
      > a {
        width: 29px;
        line-height: 28px;
        text-align: center;
        background: #f8f8f8;
        font-size: 16px;
        color: #666;
        &:first-of-type {
          border-right:1px solid #e4e4e4;
        }
        &:last-of-type {
          border-left:1px solid #e4e4e4;
        }
      }
      > input {
        width: 60px;
        padding: 0 5px;
        text-align: center;
        color: #666;
      }
    }
  }
  </style>