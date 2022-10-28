<template>
  
    <!-- 首页入口 -->
    <div class="home-entry">
      <div class="container">
      <!-- 左侧分类 -->
      <Homecategory/>
      <!-- 轮播图 -->
      <HomeBanner/>
      
    </div>
  </div>
   <!-- 新鲜毫无 -->
 <HomeNew/>
  <!-- 人气推荐 -->
  <HomeHot/>
  <!-- 品牌 -->
  <Homebrand/>
  <!-- 商品大框 -->
  <Homeprodect/>
  <!-- 最新专题 -->
  <homeSpecial/>
</template>

<script>
import Homecategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import Homebrand from './components/home-brand.vue'
import Homeprodect from './components/home-product.vue'
import homeSpecial from './components/home-special.vue'
export default { 
name: 'HomePage',
components:{
    Homecategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    Homebrand,
    Homeprodect,
    homeSpecial
  },
  setup(){

  }
}
</script>

<style scoped lang="less">
// 使用Transition组件实现一个元素或者组件的显示或者隐藏
// 进入
// 进入前 v-enter vue3.0中 v-enter-from
// 进入中 v-enter-active
// 进入后 v-enter-to
// 离开前 v-leave vue3.0中 v-leave-from
// 离开中 v-leave-active
// 离开后 v-leave-to
// 需求一个盒子在显示隐藏的时候做淡入淡出
</style>