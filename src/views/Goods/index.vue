<template>
    <div class='xtx-goods-page' v-if="goods">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{goods.categories[0].name}}</XtxBreadItem>
          <XtxBreadItem :to="`/category/${goods.categories[0].id}`">{{goods.categories[1].name}}</XtxBreadItem>
          <XtxBreadItem  >{{goods.name}}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
        <div class="media">
            <GoodsImage :images="goods.mainPictures"/>
            <GoodsSales :goods="goods"/>
        </div>
        <div class="spec">
          <GoodsName :goods="goods"/>
          <GoodsSku :goods="goods"  @change="changeSku"></GoodsSku>
          <!-- 数量组件 -->
          <XtxNumbox v-model="num" :max="goods.inventory" label="数量"/>
          <!-- 按钮组件 -->
          <XtxButton type="primary" style="margin-top:20px">加入购物车</XtxButton>
        </div>
        
      </div>
        <!-- 商品推荐 -->
        <GoodsRelevant />
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs">
              <GoodsTabs/>
            </div>
            <!-- 注意事项 -->
            <div class="goods-warn"></div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside">
            <GoodsHot/>
            <GoodsHot :type="2"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import GoodsRelevant from './components/goods-relevant'
  import {ref,watch,provide} from 'vue'
  import {findGoods} from '@/Api/product' 
  import GoodsImage from './components/goods-images.vue'
  import {useRoute} from 'vue-router'
  import GoodsSales from './components/goods-sales'
  import GoodsName from './components/goods-name'
  import GoodsSku from './components/goods-sku'
  import GoodsTabs from './components/goods.tabs.vue'
  import GoodsHot from './components/goods-hot.vue'
  export default {
    // 有可能出现路由地址商品id发生变化，但是不会重新初始化组件
    name: 'XtxGoodsPage',
    components: {  GoodsRelevant,GoodsImage, GoodsSales, GoodsName,GoodsSku,GoodsTabs,GoodsHot },
    setup(){
        // 获取商品详情
       
        const goods=useGoods()
        console.log(goods)
        const changeSku = (sku)=>{
          // 修改商品的现价原价库存信息
          if(sku.skuId){
            goods.value.price=sku.price
            goods.value.oldPrice=sku.oldPrice
            goods.value.inventory=sku.inventory
            
          }
        }
        // 选择的数量 
        const num =ref(0)
        // 依赖注入一下
        provide('goods',goods)
        return {goods,changeSku,num}
    },
   
  }
  const useGoods = ()=>{
        const goods = ref(null)
        const route = useRoute()
        watch(()=>route.params.id,()=>{
            findGoods(route.params.id).then(data=>{
                
                goods.value=data.result
            })
        },{immediate:true})
        console.log(goods)
        
        return goods
    }
  </script>
<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
