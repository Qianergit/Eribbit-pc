<template>
  <div class="goods-comment">
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{commentInfo.salesCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a href="javascript:;"
          :class="{active:currentTagsIndex===i}"
          @click="changeTag(i)"
           v-for="(item,i) in commentInfo.tags" 
           :key="item.title">{{item.title}}（{{item.tagCount}}）</a>
         
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" @click="changeSort(null)" :class="{active:reqParams.sortField===null}">默认</a>
      <a href="javascript:;" @click="changeSort('createTime')" :class="{active:reqParams.sortField==='createTime'}">最新</a>
      <a href="javascript:;" @click="changeSort('praiseCount')" :class="{active:reqParams.sortField==='praiseCount'}">最热</a>
    </div>
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'s'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i+'k'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 评论的图片组件 -->
          <goodsCommentImageVue v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <XtxPagination v-if="total" :total="total" :page-size="reqParams.pageSize" :current-page="reqParams.page" @current-change="changePagerFn"/>
  </div>
</template>
<script>
import {findGoodsCommentInfo,findGoodsCommentList} from '@/Api/product'
import goodsCommentImageVue from './goods-comment-image.vue'
import { ref ,inject,reactive, watch} from 'vue'
export default {
  name: 'GoodsComment',
  components:{
    goodsCommentImageVue
  },
  setup(){
    const commentInfo =ref(null)
    const goods = inject('goods')
    findGoodsCommentInfo(goods.value.id).then(data=>{
      console.log(data)
      data.result.tags.unshift({title:'有图',tagCount:data.result.hasPictureCount,type:'img'})
      data.result.tags.unshift({title:'全部评价',tagCount:data.result.hasPictureCount,type:'all'})
        commentInfo.value = data.result
    })
    const currentTagsIndex = ref(0)
    const changeTag = (index)=>{
      currentTagsIndex.value = index
      // 点击tag的时候修改筛选条件
      const tag = commentInfo.value.tags[index]
      // 情况一全部评价
      // 2有图
      // 3正常tag
      if(tag.type === 'all'){
        reqParams.hasPicture=null
        reqParams.tag=null
      }else if(tag.type==='img'){
        reqParams.hasPicture=true
        reqParams.tag=null
      }else{
        reqParams.hasPicture=nul
        reqParams.tag=tag.title
      }
       // 页码重置到1
       reqParams.page=1
    }
    // 点击排序
    const changeSort = (sortFIeld)=>{
      reqParams.page=1
      reqParams.sortField=sortFIeld
    }
    // 准备筛选数据条件
    const reqParams = reactive({
      page:1,
      pargeSize:10,
      hasPicture:null,
      tag:null,
      sortField:null
    })
    // 初始化需要发请求，少眩条件发生改变发请求
    const commentList = ref([])
    const total = ref(0)
    watch(reqParams,()=>{
      findGoodsCommentList(goods.id,reqParams).then(data=>{
        console.log(data)
        commentList.value=data.result.items
        total.value= data.result.counts
      })
    },{immediate:true})
    const formatSpecs = (specs)=>{
      return specs.reduce((p,c)=>`${p} ${c.name}:${c.nameVlaue}`,'').trim
    }
    const formatNickname=(nick)=>{
      return nick.substr(0,1) + '*****' + nick.substr(-1)
    }
    // 实现分页切换
    const changePagerFn=(newPage)=>{
         reqParams.page = newPage
    }
    return {commentInfo,currentTagsIndex,changeTag,reqParams,changeSort,commentList,formatSpecs,formatNickname,total,changePagerFn}
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>