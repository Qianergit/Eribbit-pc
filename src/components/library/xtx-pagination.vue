<template>
    <div class="xtx-pagination">
      <a v-if="myCurrentPage<1" href="javascript:;" class="disabled">上一页</a>
      <a v-else href="javascript:;" @click="changePager(myCurrentPage-1)" >上一页</a>
      <span v-if="pager.start>1">...</span>
      <a href="javascript:;" v-for="i in pager.btnArr" 
      :key="i" 
      :class="{active: i ===myCurrentPage}"
     @click="changePager(i)"
      >{{i}}</a>
      <span v-if="pager.end<pager.pageCount">...</span>
      <a href="javascript:;" v-if="myCurrentPage<pager.pageCount" @click="changePager(myCurrentPage-1)">下一页</a>
      <a href="javascript:;" v-else class="disabled">下一页</a>
    </div>
  </template>
  <script>
  import {ref,computed,watch} from 'vue'
  export default {
    name: 'XtxPagination',
    props:{
        total:{
            type:Number,
            default:100
        },
        pageSize:{
            type:Number,
            default:10
        },
        currentPage:{
            type:Number,
            default:1
        }
    },
    setup(props,{emit}){
        // 约定按钮的个数是5个
        const count = 5
        // 当前选择的页码
        const myCurrentPage = ref(1)
        // 一共有多少条数据
        const myTotal = ref(100)
        // 每页显示多少条
        const myPageSize = ref(10)
        // 其它数据(总页数,起始按钮,结束按钮,按钮数组)依赖上面的数据得到
        // 监听传入的值
        watch(props,()=>{
            myTotal.value = props.total
            myPageSize.value = props. pageSize
            myCurrentPage.value = props.currentPage
        },{immediate:true})
        const pager = computed(()=>{
            // 总页数
            const pageCount = Math.ceil(myTotal.value / myPageSize.value)
            const offset = Math.floor(count / 2)
            let start = myCurrentPage.value - offset
            let end = start + count -1
            if(start<1){
                start = 1
                end = (start +count-1) > pageCount ? pageCount : (start +count-1)
            }
            if(end>pageCount){
                end = pageCount
                start = (end-count+1) < 1 ? 1:(end-count+1)
            }
            const btnArr =[]
            for(let i = start ; i<=end ; i++){
                btnArr.push(i)
            }
            return {
                end,
                start,
                pageCount,
                btnArr
            }
        })
        // console.log(pager.value.btnArr)
        // 切换分页数据
        const changePager = (page)=>{
            myCurrentPage.value = page
            // 通知父组件
            emit('current-change',page)
        }
        return {pager,myCurrentPage,changePager}
    }
  }
  </script>
  <style scoped lang="less">
  .xtx-pagination {
    display: flex;
    justify-content: center;
    padding: 30px;
    > a {
      display: inline-block;
      padding: 5px 10px;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      margin-right: 10px;
      &:hover {
        color: @xtxColor;
      }
      &.active {
        background: @xtxColor;
        color: #fff;
        border-color: @xtxColor;
      }
      &.disabled {
        cursor: not-allowed;
        opacity: 0.4;
        &:hover {
          color: #333
        }
      }
    }
    > span {
      margin-right: 10px;
    }
  }
  </style>