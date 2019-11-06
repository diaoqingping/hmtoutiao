<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              @click="toggleStatus(scope.row.id,false)"
              v-if="scope.row.comment_status"
            >关闭评论</el-button>
            <el-button
              type="success"
              size="small"
              @click="toggleStatus(scope.row.id,true)"
              v-else
            >打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        response_type: 'comment',
        per_page: 20,
        page: 1
      },
      total: 1
    }
  },
  methods: {
    // 获取文章评论
    async  getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      // 分页
      this.reqParams.page = newPage
      this.getArticles()
    },
    toggleStatus (id, status) {
      const text = status ? '您确认要打开评论吗？' : '您确认关闭评论吗，如果关闭用户将无法对该文章进行评论。'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${id}`, { allow_comment: status })
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        this.getArticles()
      }).catch(() => {
      })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style scoped lang='less'></style>
