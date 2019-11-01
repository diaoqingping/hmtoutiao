<template>
  <div class="container-article">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件查询到{{total}}条数据</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px;">
              <div slot="error">
                <img src="../../assets/images/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="日期" prop="pubdate"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">标签四</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">标签五</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                circle
                @click="toEdit(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                circle
                @click="del(scope.row.id)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        style="margin-top:20px"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        per_page: null,
        page: null,
        begin_update: null,
        end_update: null
      },
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_update = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_update = null
      }
    },
    toEdit (articleId) {
      this.$router.push({ path: '/public', query: { id: articleId } })
    },
    async del (articleId) {
      await this.$http.delete(`articles/${articleId}`)
      this.$message.success('删除文章成功')
      this.getArticles()
    }
  }

}
</script>

<style scoped lang='less'></style>
