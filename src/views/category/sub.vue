<template>
    <div class="sub-category">
      <div class="container">
        <!-- 面包屑组件 -->
        <subBread/>
      </div>

    </div>
  </template>
  
  <script>
  import subBread from './components/sub-bread.vue'
  export default {
  name:'SubCategory',
  components:{
    subBread
  }

  }
  </script>
  
  <style>
  
  </style>