<template>
  <div class="container">
    <el-card>
      <img src="../../assets/images/logo_index.png" width="200px" />
      <el-form ref="formData" :model="formData" :rules="formRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px;"
          ></el-input>
          <el-button style="width:110px">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-button type="primary" @click="login">立即登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  methods: {
    checkMobile (rule, value, callback) {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不对'))
      }
    },
    login () {
      this.$refs['formData'].validate(async validate => {
        if (validate) {
          try {
            const { data: { data } } = await
            this.$http.post('authorizations', this.formData)
            local.setUser(data)
            this.$router.push('/')
          } catch (error) {
            this.$message.error('信息填写错了哦')
          }
        }
      })
    }
  },
  data () {
    return {
      formData: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: this.checkMobile, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }, { len: 6, message: '验证码6个字符', trigger: 'blur' }]
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.el-card {
  width: 400px;
  height: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    margin: 0 auto 30px;
  }
}
.el-button {
  width: 100%;
}
</style>
