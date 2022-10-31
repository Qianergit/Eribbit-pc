<template>
    <div class="sub-category">
      <div class="container">
        <!-- 面包屑组件 -->
        <subBread/>
        <SubFilter @filter-change="filterChange"/>
        <div class="goods-list">
          <subSort @SortChange="sortChange"/>
          <ul>
            <li  v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods"/>
          </li>
          </ul>
          <!-- 无限加载组件 -->
          <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getDate"></XtxInfiniteLoading>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import subBread from './components/sub-bread.vue'
  import SubFilter from './components/sub-filter.vue'
  import subSort  from './components/sub-sort.vue'
  import GoodsItem from './components/goods-item.vue'
  import {findSubCategoryGoods} from '@/Api/category'
  import {ref,watch,reactive} from 'vue'
  import {useRoute} from 'vue-router'
  export default {
  name:'SubCategory',
  components:{
    subBread,
    SubFilter,
    subSort,
    GoodsItem
  },
  setup(){
    const route =useRoute()
    // 加载中
   const loading=ref(false)
  //  是否加载完毕
   const finished = ref(false)
   const goodsList = ref([])
   let reqParams={
    page:1,
    pageSize:20
   }
   const getDate=()=>{
        loading.value=true
        reqParams.categoryId = route.params.id
        findSubCategoryGoods(reqParams).then(({result})=>{
          if(result.items.length){
            goodsList.value.push(...result.items)
            // 把page改成下一个页码
            reqParams.page++
          }else{
            finished.value=true
          }
          console.log(goodsList)
          loading.value=false
        })
   }
  //  在更改二级分类的时候重新加载
  watch(()=>route.params.id,(newVal)=>{
    if(newVal&&`category/sub/${newVal}`===route.path){
      finished.value=false
           goodsList.value=[]  //空列表会让显示的list为空的低下的可视区就会顶上来
           reqParams={
            page:1,
            pageSize:20
           }
    }

  })
  // 更改排序组件的筛选数据，重新请求
  const sortChange =(sortParams)=>{
    console.log(sortParams)
    finished.value=false
    // 合并请求参数，保留之前参数
    reqParams = {...reqParams,...sortParams}
    reqParams.page=1
    goodsList.value=[]
  }
  // 更改筛选组件的数据，重新请求
  const filterChange=(filterParams)=>{
    finished.value=false
    reqParams = {...reqParams,...filterParams}
    reqParams.page=1
    goodsList.value=[]  
  }
   return {loading,finished, getDate,goodsList,sortChange,filterChange}
  }


  }
  </script>
  
  <style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>