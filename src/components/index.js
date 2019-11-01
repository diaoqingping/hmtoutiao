import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  // Vue是一个构造函数
  install (Vue) {
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
  }

}
