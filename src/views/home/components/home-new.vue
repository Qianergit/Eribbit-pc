<template>
  <div ref="target">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱"> 
    <template v-slot:right>
      <XtxMore path="/"/>
    </template>
    <Transition name="fide">
    <ul class="goods-list" v-if="goods.length" >
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton bg="#f0f9f4" v-else />
    </Transition>
   </HomePanel>
  
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import {findNew} from '@/Api/home'
import {ref} from 'vue'
import {useLazytData} from '@/hooks'
export default {
name:'HomeNew',
components:{
    HomePanel,
    HomeSkeleton
},
setup(){
    
    // findNew().then(data=>{
    //  goods.value=data.result
    // })
    const target = ref(null)
    const result = useLazytData(target,findNew)
    console.log(result)
    return {goods: result,target}

   
}
}
</script>

<style scoped lang="less">

.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>