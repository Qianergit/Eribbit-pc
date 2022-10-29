<template>
	<!-- 筛选区 -->
   <div class="sub-filter" v-if="filterData && !filterLoading">
     <div class="item" >
       <div class="head">品牌：</div>
       <div class="body">
         <a href="javascript:;" :class="{active:item.id===filterData.brands.slectedBrand}" v-for="item in filterData.brands" :key="item.id">{{item.name}}</a>
       </div>
     </div>
     <!-- 这里是选项 -->
     <div class="item" v-for="items in filterData.saleProperties" :key="items.id">
       <div class="head">{{items.name}}</div>
       <div class="body">
         <a href="javascript:;" :class="{active:prop.id===items.selectedAttr}" v-for="prop in items.properties" :key="prop.id">{{prop.name}}</a>
       </div>
     </div>
   </div>
   <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import {ref,watch} from 'vue'
import {useRoute} from 'vue-router' 
import {findSubCategoryFilter}from '@/Api/category'

export default {
  name: 'SubFilter',
  setup(){
    const filterLoading = ref(false)
    const route = useRoute()
    // 监听二级类目的id的变化获取筛选数据
    const filterData=ref(null)
     watch(()=> route.params.id,(newVal)=>{
        // 变化后的id有值并且处于二级类目
        
        if(newVal&&`/category/sub/${newVal}`===route.path){
            // 发送请求数据
            filterLoading.value=true
            findSubCategoryFilter(route.params.id).then(data=>{
                // 每一组可选的筛选条件都缺失 全部这一项
                // 给每一组数据加一个当前选中的id
                data.result.brands.slectedBrand=null
                data.result.brands.unshift({id:null,name:'全部'})
                data.result.saleProperties.forEach(item=>{
                    item.selectedAttr=null
                    item.properties.unshift({id:null,name:'全部'})
                })
                console.log(data.result)
                filterData.value=data.result
                filterLoading.value=false
            })
        }
     },{immediate:true})
    return {filterData, filterLoading}
  }
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;  
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .xtx-skeleton {
      padding: 10px 0;
    }
</style>