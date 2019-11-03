<template>
  <div class="container-pubish">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="标题：" style="width:400px;">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="内容：" style="margin-bottom:60px;">
          <quill-editor v-model="content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio v-model="rodio" label="1">单图</el-radio>
          <el-radio v-model="rodio" label="2">三图</el-radio>
          <el-radio v-model="rodio" label="2">无图</el-radio>
          <el-radio v-model="rodio" label="2">自动</el-radio>
          <!-- //封面图组件 -->
          <div>
            <my-image></my-image>
            <my-image></my-image>
            <my-image></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
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
      reqParams: {
        channel_id: null
      },
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
      }
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style scoped lang='less'>
</style>
