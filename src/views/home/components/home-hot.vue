<template>
  <div class="HomeHot" ref="target">
  <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
    <Transition name="fide">
     
    <ul  class="goods-list" v-if="goods.length">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
    <HomeSkeleton bg="#f0f9f4" v-else/>
  </Transition>
  </HomePanel>

  </div>
</template>

<script>
import HomeSkeleton from './home-skeleton.vue'
import HomePanel from './home-panel.vue'
import {ref} from 'vue'
import {findHot} from '@/Api/home'
import {useLazytData} from '@/hooks'
export default {
name:'HomeHot',
components:{
    HomePanel,
    HomeSkeleton
},
setup(){
  
    const target = ref(null)
    // findHot().then(data=>{
    //     goods.value = data.result
    // })
    const result = useLazytData(target,findHot)
    return {goods:result,target}
}
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
