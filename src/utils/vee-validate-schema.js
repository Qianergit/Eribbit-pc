export default{
   
        account(value){
          if(!value) return '请输入密码'
        //   规则字母开头6-20个字符之间
          if(!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
          return true
        },
   
    // 密码校验
    password(value){
        if(!value) return '请输入密码'
        // 规则 6-24个字符
        if(!/^\w{6,24}$/.test(value)) return '密码格式6-24个字符'
        return true
    },
    mobile(value){
        if(!value) return '请输入手机号'
        if(!/^1[3-9]\d{9}$/.test(value)) return '手机号格式不正确'
        return true
    },
    code(value){
        if(!value) return '请输入验证码'
        if(!/^\d{6}$/.test(value)) return '验证码为6个字符'

    },
    isAgree(value){
        if(!value) return '请勾选登陆协议'
        return true
    }
}