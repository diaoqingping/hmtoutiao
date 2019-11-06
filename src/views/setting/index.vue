<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form label-width="120px">
              <el-form-item label="编号：">1</el-form-item>
              <el-form-item label="手机：">13211121222</el-form-item>
              <el-form-item label="媒体名称">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false"
              style="margin:100px 120px;"
              :http-request="uploadImg"
              name="image"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
import local from '@/utils/local'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: null
      },
      imageUrl: null
    }
  },
  methods: {
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
      this.imageUrl = data.photo
    },
    saveUserInfo () {
      this.$http.patch('user/profile', this.userInfo).then((res) => {
        this.$message.success('恭喜！！！修改个人信息成功！！！')
        const { name } = res.data.data
        eventBus.$emit('updateName', name)
        const user = local.getUser()
        user.name = name
        local.setUser(user)
      })
    },
    async uploadImg ({ file }) {
      // 自定义上传头像
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      this.$message.success('修改头像成功')
      this.imageUrl = data.photo
      eventBus.$emit('updatePhoto', data.photo)
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang='less'></style>
