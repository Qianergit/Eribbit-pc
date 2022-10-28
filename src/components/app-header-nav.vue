<template>
   <ul class="app-header-nav">
        <li class="home"><RouterLink to="/">首页</RouterLink></li>
        <li v-for="item in list" :key="item.id" @mouseenter="show(item.id)" @mouseleave="hide(item.id)">
            <RouterLink :to="`/category/${item.id}`" @click="hide(item.id)">{{item.name}}</RouterLink>
      <div class="layer" :class="{open: item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(item.id)">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
        </li>
        
      </ul>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
setup(){
  const store=useStore()
  // 拿到vuex中的分类列表
  const list = computed(()=>{
    return store.state.category.list
  })
  // 在这里控制二级目录的显示和隐藏
   const show= (id)=>{
         store.commit('category/open',id)
  }
  const hide= (id)=>{
         store.commit('category/hide',id)
  }
  
  return {list,show,hide}
}
}
</script>

<style lang="less">
 .app-header-nav {
    position: relative;
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    >li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
     > a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
        //这个位置时显示二级类目
      //   > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
      }
    }
  }
  .layer {
    &.open{
    height: 132px;
    opacity: 1;
    }
    width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  z-index:999;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>