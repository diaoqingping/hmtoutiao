<template>
  <div class="container">
    <el-card>
      <img src="../../assets/images/logo_index.png" width="200px" />
      <el-form ref="form" :model="formData">
        <el-form-item>
          <el-input v-model="formData.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formData.name"
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px;"
          ></el-input>
          <el-button style="width:110px">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-button type="primary">立即登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: ''
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
