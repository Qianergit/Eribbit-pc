<template>
    <div class="account-box">
      <div class="toggle">
        <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
          <i class="iconfont icon-user"></i> 使用账号登录
        </a>
        <a @click="isMsgLogin=true" href="javascript:;" v-else>
          <i class="iconfont icon-msg"></i> 使用短信登录
        </a>
      </div>
      <Form ref="formCom" class="form" autocomplete="off" v-slot="{errors}" :validation-schema="schema">
        <template v-if="!isMsgLogin" >
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field :class="{error:errors.account}" v-model="form.account" name="account" type="text" placeholder="请输入用户名" />
            </div>
            <div class="error" v-if="errors.account">
                <i class="iconfont icon-warning" />
                {{errors.account}}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <Field  v-model="form.password" name="password" type="password" placeholder="请输入密码"/>
            </div>
            <div class="error" v-if="errors.password">
                <i class="iconfont icon-warning" />
                {{errors.password}}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
            </div>
            <div class="error" v-if="errors.mobile">
                <i class="iconfont icon-warning" />
                {{errors.mobile}}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field v-model="form.code" name="code" type="password" placeholder="请输入验证码"/>
              <span class="code">发送验证码</span>
            </div>
            <div class="error" v-if="errors.code">
                <i class="iconfont icon-warning" />
                {{errors.code}}
            </div>
          </div>
        </template>

        <div class="form-item">
          <div class="agree">
            <Field name="isAgree" as="XtxCheckbox" v-model="form.isAgree" />
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
          <div class="error" v-if="errors.isAgree">
                <i class="iconfont icon-warning" />
                {{errors.isAgree}}
            </div>
        </div>
        <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
      <div class="action">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
        <div class="url">
          <a href="javascript:;">忘记密码</a>
          <a href="javascript:;">免费注册</a>
        </div>
      </div>
      <!-- 测试 -->
    </div>
  </template>
  <script>
import { reactive, ref,watch,getCurrentInstance } from 'vue'
import {Form,Field} from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
  export default{
    components:{
      Form,
      Field
    },
      setup(){
        // 表单登录切换
        const isMsgLogin =ref(false)
        // 表单数据对象
        const form = reactive({
            isAgree:true,
            account:null,
            password:null,
            mobile:null,
            code:null
        })
        // vee-validate 校验基本步骤
        // 1.导入Form Field 组件将form 和input 进行替换，需要加上name用来指定将来的校验规则函数的绑定
        // 2.Field需要v-model的数据绑定
        // 3. 定义Field的name属性指定的校验属性规则使用 在Form的validation-schema 接收定义好的校验规则，是一个对象
        
        const mySchema = {
          account:schema.account,
          password:schema.password,
          mobile:schema.mobile,
          code:schema.code,
          isAgree:schema.isAgree

        } 
        const formCom = ref(null)
        // 重置表单数据
        watch(isMsgLogin,()=>{
          form.isAgree=false,
          form.account=null,
          form.password=null,
          form.mobile=null,
          form.code=null
          
          // Form提供了清除校验结果的方法 resetForm（）
          // fromCom.value.restForm()
        })
        // 点击登陆时对整体表单进行校验

        const {proxy} = getCurrentInstance() //拿到应用实例
        const login = async ()=>{
          // form表单提供了validate的方法进行表单校验
         const valid = await formCom.value.validate()
         Message({type:'error',text:'用户名或者密码错误'})
       
        }

        return{isMsgLogin,form,schema:mySchema,login,formCom}
      },
      created(){
        this.$Message({type:'error',text:'123'})
      }
  }
  </script>
  <style scrped lang="less">
    .account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
  </style>