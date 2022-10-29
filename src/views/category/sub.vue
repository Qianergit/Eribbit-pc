<template>
    <div class="sub-category">
      <div class="container">
        <!-- 面包屑组件 -->
        <subBread/>
        <SubFilter/>
      </div>
       
    </div>
  </template>
  
  <script>
  import subBread from './components/sub-bread.vue'
  import SubFilter from './components/sub-filter.vue'
  export default {
  name:'SubCategory',
  components:{
    subBread,
    SubFilter
  }

  }
  </script>
  
  <style>
  
  </style>