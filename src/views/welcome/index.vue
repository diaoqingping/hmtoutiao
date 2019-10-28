<template>
  <div class="container-welcome">
    <img src="../../assets/images/welcome.jpg" />
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang='less'>
.container-welcome {
  img {
    display: block;
    margin: 0 auto;
  }
}
</style>
