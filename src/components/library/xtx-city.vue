<template>
    <div class="xtx-city" ref="target">
      <div class="select" @click="toggle()" :class="{active:visible}">
        <span class="placeholder" v-if="!fullLocation" >请选择配送地址</span>
        <span class="value" v-else >{{fullLocation}}</span>
        <i class="iconfont icon-angle-down"></i>
      </div>
      <div class="option" v-if="visible">
        <div  v-if="loading" class="loading"></div>
        <template v-else>
            <span class="ellipsis" @click="changeItem(item)" v-for="item in currList" :key="item.code">{{item.name}}</span>
        </template>
        
      </div>
    </div>
  </template>
<script>
import {computed, ref,reactive} from 'vue'
import { onClickOutside} from '@vueuse/core'
import axios from 'axios'
export default{
    name:'XtxCity',
    props:{
        fullLocation:{
            type:String,
            default:''
        }
    }, 
    setup(props,{emit}){
        // 操作对话框
        const visible = ref(false)
        // 所有的城市数据
        const allCityData = ref([])
        // 是否正在加载数据
        const loading =ref(false)
        // 提供打开和关闭的函数
        const open = ()=>{
            visible.value = true
            loading.value = true
            getCityData().then(data=>{
                allCityData.value = data
                loading.value = false
              
            })
            // 清空之前选择的东西
            for( let key in changeResult){
                changeResult[key] = ''
            }
        }
        const close = ()=>{
            visible.value = false
        }
        const toggle= ()=>{
            visible.value ? close() : open()
        }
        // 点击标签外部元素关闭对话框
        const target = ref(null)
        onClickOutside(target,()=>{
            // 第一个参数是监听那个元素，第二个参数是执行的事件
            close()
        })
        // 实现一个计算属性：获取当前显示的地区列表
        const currList = computed(()=>{
            // 默认省一级
            let list = allCityData.value
         if(changeResult.provinceCode&&changeResult.provinceName){
            list = list.find(p=>p.code===changeResult.provinceCode).areaList
         }
         if(changeResult.cityCode&&changeResult.cityName){
            list = list.find(p=>p.code===changeResult.cityCode).areaList
         }
            
            return list
        })
        // 定义选择的省市区数据
        let changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''  
    })
    // 当点击按钮的时候记录数据
        const changeItem = (item)=>{
            if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${ changeResult.provinceName} ${ changeResult.cityName} ${changeResult.countyName}`
		// 这时最后一级选完了，关闭对话框，通知父组件数据
        close()
        emit('change',changeResult)
        
      }
        }
        
        return {visible,toggle,target,loading,currList,changeItem}
    },
}
    const getCityData = () => {
        // 获取省市区数据函数
        // 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
        // 2. 何时获取？打开城市列表的时候，做个内存中缓存
        // 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
        // 当本地没有缓存，发请求获取数据
        // 当本地有缓存就取出本地数据
        // 返回promise在then获取数据，这里可能是异步操作可能是同步操作
        return new Promise((resolve,reject)=>{
            // 约定 数据存储在window上的cityData字段
            if(window.cityData){
                resolve(window.cityData)
            }else{
                let url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
                axios.get(url).then(res=>{
                    window.cityData = res.data
                    resolve(res.data)
                })
            }
        })
    }



</script>



  <style lang="less" scoped>
  .xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;  
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>