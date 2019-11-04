<template>
  <div class="container-pubish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="标题：" style="width:400px;">
          <el-input type="text" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：" style="margin-bottom:60px;">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- //封面图组件 -->
          <div>
            <div v-if="articleForm.cover.type===1">
              <my-image v-model="articleForm.cover.images[0]"></my-image>
            </div>
            <div v-if="articleForm.cover.type===3">
              <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      rodio: '1',
      content: null,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      articleForm: {
        title: null,
        content: null,
        cover: {
          images: [],
          type: 1
        },
        channel_id: null
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    async create (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    async update (draft) {
      await this.$http.put(`articles/${this.articleForm.id}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // 去内容管理
      this.$router.push('/article')
    },
    async getArticles (id) {
      const { data: { data } } = await this.$http.get('articles/' + id)
      this.articleForm = data
    },
    toggleArticleStatus () {
      const articleId = this.$route.query.id
      if (articleId) {
        // 获取文章信息
        this.getArticles(articleId)
      } else {
        // 当从修改文章跳到发布文章时，重置articleForm对象
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            images: [],
            type: 1
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    this.toggleArticleStatus()
  },
  watch: {
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  }
}
</script>

<style scoped lang='less'>
</style>
