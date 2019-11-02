<template>
  <div class="container-img">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>素材管理</my-bread>
      </div>
      <div calss="btn">
        <el-radio-group v-model="reqParams.collect" size="small" @change="toggleCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right;" @click="dialogVisible=true">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="footer" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{red:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="deleItem(item.id)"></span>
          </div>
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
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="true"
          style="text-align:center;"
          :before-upload="beforeAvatarUpload"
          :on-success="handleSuccess"
        >
          <img v-if="imgURL" :src="imgURL" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        collect: false
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      fileList: [],
      imgURL: null
    }
  },
  methods: {
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
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      item.is_collected = data.collect
      this.$message.success((data.collect ? '添加' : '取消') + '收藏成功')
    },
    deleItem (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getImages()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleSuccess (res, file) {
      console.log(111)
      this.setHeader('content-type', 'Access-Control-Allow-Origin')
      console.log(res.data)
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding: 20px;
  .img_item {
    width: 170px;
    height: 170px;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-top: 20px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
.page {
  margin-top: 20px;
  text-align: center;
}
</style>
