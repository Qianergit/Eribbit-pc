<template>
   <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="goodsList">
        <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/views/category/components/goods-item.vue'
import { findHotGoods} from '@/Api/product'
import {computed,ref,} from 'vue'
import {useRoute} from 'vue-router'
export default {
name:'GoodsHot',
components:{
    GoodsItem
},
props:{
    // 热榜组件
    type:{
        type:Number,
        default:1
    },
},
setup(props){
        const types = {1:'24小时热销榜',2:'周榜',3:'热门推荐'}
        const title= computed(()=>{
            return types[props.type]
        })
        console.log(title)
        // 拿热门信息
        const goodsList = ref({})
        const route = useRoute()
        let id = route.params.id
        findHotGoods(id,props.type).then(data=>{
          goodsList.value = data.result
        })
        return {title,goodsList}
    }
}
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep( .goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>