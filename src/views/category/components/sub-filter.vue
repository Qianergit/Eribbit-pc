<template>
	<!-- 筛选区 -->
   <div class="sub-filter" v-if="filterData && !filterLoading">
     <div class="item" >
       <div class="head">品牌：</div>
       <div class="body">
         <a href="javascript:;" @click="changeBrand(item.id)" :class="{active:item.id===filterData.brands.selectedBrand}" v-for="item in filterData.brands" :key="item.id">{{item.name}}</a>
       </div>
     </div>
     <!-- 这里是选项 -->
     <div class="item" v-for="items in filterData.saleProperties" :key="items.id">
       <div class="head">{{items.name}}</div>
       <div class="body">
         <a href="javascript:;"  @click="changeProp(items,prop.id)" :class="{active:prop.id===items.selectedProp}" v-for="prop in items.properties" :key="prop.id">{{prop.name}}</a>
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
  setup(prop,{emit}){
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
                data.result.brands.selectedBrand=null
                data.result.brands.unshift({id:null,name:'全部'})
                data.result.saleProperties.forEach(item=>{
                    item.selectedProp=null
                    item.properties.unshift({id:null,name:'全部'})
                })
                console.log(data.result)
                filterData.value=data.result
                filterLoading.value=false
               
            })
        }
     },{immediate:true})
    //  获取筛选参数的函数
    const getFilterParams=()=>{
         const obj={brandId:null,attrs:[]}
        //  品牌
        obj.brandId=filterData.value.brands.selectedBrand
        // 销售属性
        filterData.value.saleProperties.forEach(item=>{
          if(item.selectedProp){
            const prop=item.properties.find(prop=>prop.id===item.selectedProp)
           obj.attrs.push({groupName:item.name,PropertyName:prop.name})
          }
        })
        if(obj.attrs.length===0) obj.attrs=null
        return obj
    }
    //  机录当前选择的品牌
    const changeBrand=(brandId)=>{
      if(filterData.value.selecttedBrand ===brandId) return 
         filterData.value.brands.selectedBrand=brandId
         emit('filter-change',getFilterParams())
    }
    // 机录已选择的销售属性
    const changeProp = (item,propId)=>{
      if( item.selectedProp===propId) return 
       item.selectedProp=propId
       emit('filter-change',getFilterParams())
    }
    return {filterData, filterLoading,changeProp,changeBrand}
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