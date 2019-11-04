<template>
  <div class="container-image">
    <div class="imgbtn" @click="addCover">
      <img :src="value || btnImg" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" size="small" @change="toggleCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in images"
              :key="item.id"
              @click="selectedImage(item.url)"
              :class="{selected:selectedImageUrl===item.url}"
            >
              <img :src="item.url" />
            </div>
          </div>
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            name="image"
            style="text-align:center;"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="imgURL" :src="imgURL" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectedCover">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import btnimg from '../assets/images/default.png'
export default {
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      total: 0,
      btnImg: btnimg,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      selectedImageUrl: null,
      imgURL: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('local-key')).token
      }
    }
  },
  methods: {
    addCover () {
      this.dialogVisible = true
      this.getImages()
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // console.log(data.results)
      this.images = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg' || 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG | png | jpeg格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleSuccess (res) {
      this.imgURL = res.data.url
      // 再次打开对话框的时候，预览的是上传按钮 而不是 之前的图片
      // this.imgURL = null
    },
    selectedCover () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选择一张图片')
        }
        this.btnImg = this.selectedImageUrl
        // 提交给父组件
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else if (this.activeName === 'upload') {
        this.btnImg = this.imgURL
        // 提交给父组件
        this.$emit('input', this.imgURL)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container-image {
  display: inline-block;
  margin-right: 20px;
  .imgbtn {
    width: 120px;
    height: 120px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img_list {
    padding: 20px;
    .img_item {
      width: 145px;
      height: 110px;
      display: inline-block;
      position: relative;
      margin-right: 20px;
      margin-top: 20px;
      border: 1px dashed #ddd;
      &.selected::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
          no-repeat center / 50px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .page {
    text-align: center;
  }
}
</style>
