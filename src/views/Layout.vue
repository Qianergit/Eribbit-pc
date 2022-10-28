<template>
<!-- 顶部通栏 -->
<nav><AppTopnav/></nav>

<!-- 头部组件 -->
<AppHeader />
<!-- 吸顶头部组件 -->
<AppSticky />
<main class="app-body">
 <router-view></router-view>
</main>
<!-- 底部组件 -->
<AppFooter/>

</template>

<script>
import AppTopnav from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
name: 'Layout',
components:{
  AppTopnav,
  AppHeader,
  AppFooter,
  AppSticky,
},
setup(){
   const store = useStore()
   store.dispatch('category/getList')
}
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
 
}

</style>