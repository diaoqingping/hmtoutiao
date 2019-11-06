<template>
  <div class="container">
    <el-container>
      <el-aside :width="isopen?'200px':'64px'">
        <div class="logo" :class="{smallLogo:!isopen}"></div>
        <el-menu
          default-active="$route.path"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="nav"
          :collapse="!isopen"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/public">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-fold" @click="toggleMenu"></span>
          <span class="text_title">江苏传智播客科技教育有限公司</span>
          <el-dropdown class="dropdown" @command="handleClick">
            <span class="el-dropdown-link">
              <img :src="user.photo" class="toux" />
              <span class="userName">{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      isopen: true,
      user: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    toggleMenu () {
      this.isopen = !this.isopen
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    },
    handleClick (command) {
      this[command]()
    }
  },
  created () {
    this.user = local.getUser() || {}
    eventBus.$on('updateName', (name) => {
      this.user.name = name
    })
    eventBus.$on('updatePhoto', (photo) => {
      this.user.photo = photo
    })
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .logo {
    width: 100%;
    height: 50px;
    background: url(../../assets/images/logo_admin.png) no-repeat center/165px
      auto;
  }
  .toux {
    border-radius: 50%;
  }
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #002033;
    }
    .el-header {
      border-bottom: 1px solid #ccc;
    }
    .nav {
      border-right: none;
    }
  }
  .el-icon-s-fold {
    font-size: 24px;
    line-height: 60px;
    vertical-align: middle;
  }
  .el-header {
    line-height: 60px;
    .text_title {
      line-height: 60px;
      vertical-align: middle;
      margin-left: 10px;
    }
    .dropdown {
      float: right;
      img {
        width: 30px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .userName {
        vertical-align: middle;
      }
    }
  }
  .smallLogo {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
}
</style>
