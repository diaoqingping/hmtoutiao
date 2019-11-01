<template>
  <div class="container">
    <el-select :value="value" placeholder="请选择" @change="changeChannel">
      <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    changeChannel (channelId) {
      if (channelId === '') {
        channelId = null
      }
      this.$emit('input', channelId)
    }
  },
  created () {
    this.getChannelOptions()
  }
}
</script>

<style scoped lang='less'></style>
