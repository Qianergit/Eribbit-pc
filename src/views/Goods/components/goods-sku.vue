<template>
    <div class="goods-sku" >
      <dl v-for="item in goods.specs" :key="item.id">
        <dt>{{item.name}}</dt>
        <dd>
            <template v-for="val in item.values" :key="val.name">
          <img @click="changeSku(item,val)" :class="{selected:val.selected,disabled:val.disabled}" v-if="val.picture" :src="val.picture" alt="" :title="val.name">
           <span @click="changeSku(item,val)" :class="{selected:val.selected,disabled:val.disabled}"  v-else>{{val.name}}</span>
           </template>
        
         
        </dd>
      </dl>
      
    </div>
  </template>
  <script>
//   得到一个路径字典对象
import powerSet from '@/vander/power-set'
const spliter = '★'
const getPathMap = (skus)=>{
    // 得到所有的sku集合 props.goods.skus
    // 从所有的sku中筛选出有效的sku
    // 根据有效的sku使用power-set算法得到子集
    // 根据子集向路径对象就是路径字典中存储key-value
const pathMap = {}
    skus.forEach(sku=>{
        if(sku.inventory > 0){
            const valueArr=sku.specs.map(val =>val.valueName)
            const valueArrPowerSet = powerSet(valueArr)
            valueArrPowerSet.forEach(arr=>{
                const key = arr.join(spliter)
                if(pathMap[key]){
                   pathMap[key].push(sku.id)
                }else{
                pathMap[key]=[sku.id]
                }
            })
            console.log(pathMap)
        }
    })
    return pathMap
}
const getSelectedValues= (specs)=>{
    let arr = []
    specs.forEach(item=>{
        const selectedVal = item.values.find(val=>val.selected)
        arr.push(selectedVal ? selectedVal.name :undefined)
    })
   return arr 

}
// 更新按钮禁用状态
const updateDisabledStatus = (specs,pathMap)=>{
    // 约定每一个按钮的状态由本身的disable数据来控制
     specs.forEach((item,i)=>{
        const SelectedValues = getSelectedValues(specs)
        item.values.forEach(val=>{
        //    判断当前是否选中，是选中就不用判断
        // 如果不是选中那就拿当前顺序去套入数组
        // 剔除undefined数据，按照自己设定的分割符拼接成key
        // 拿着key去路径中查找数据,有就可以点击没有就不能点击
        if(val.selected) return 
        SelectedValues[i]=val.name
        const key = SelectedValues.filter(value => value).join(spliter)
        val.disabled= !pathMap[key]
        })
     })
}
  export default {
    name: 'GoodsSku',
    props:{
        goods:{
        type:Object,
        default:()=>({})
        }
    },
    setup(props){
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
    //    选中与取消选中，约定在每一个按钮都拥有自己的选中状态数据 selected
    // 当你点击的是已选中，只需要取消当前的选中
    // 如果点击的是未选中，把同一个规格的按钮改成未选中
   const changeSku = (item,val)=>{
    // 如果此使是禁用 的那就阻止程序运行
    if(val.disabled) return
    // 如果不是禁用则正常进行
       if(val.selected){
        val.selected=false
       }else{
        item.values.forEach(valItem=>{
            valItem.selected=false
            val.selected=true
        })
       }
        // 点击按钮时也要更新按钮的禁用状态
        updateDisabledStatus(props.goods.specs,pathMap)
   }
     // 组件初始化的时候更新一次按钮的状态
     updateDisabledStatus(props.goods.specs,pathMap)
   return {changeSku,pathMap}
    }
  }
  </script>
  <style scoped lang="less">
  .sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    &.selected {
      border-color: @xtxColor;
    }
    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }
  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;
    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        flex: 1;
        color: #666;
        > img {
          width: 50px;
          height: 50px;
          .sku-state-mixin ();
        }
        > span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          .sku-state-mixin ();
        }
      }
    }
  }
  </style>