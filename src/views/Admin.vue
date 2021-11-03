<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="activeItem" @select="handleSelect">
          <el-menu-item index="/userManagement">用户管理</el-menu-item>
          <el-menu-item index="/productManagement">商品管理</el-menu-item>
          <el-menu-item index="/hotBookList">热销榜单</el-menu-item>
          <el-menu-item index="/orderManagement">订单管理</el-menu-item>
          <el-menu-item index="/broadcastManagement">公告管理</el-menu-item>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ $store.state.username }}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      activeItem: '/productManagement',
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        axios({
          method: "get",
          url: "out"
        }).then((response) => {
          this.$store.commit('PUT_LOGIN_STATE', false)
          this.$store.commit('PUT_USERNAME', "")
          this.$router.push('/')
          location.reload()

        })

      }
    },
    handleSelect(path) {
      if (path !== this.$route.fullPath)
        this.$router.push(path);
    }
  },
  mounted() {
    this.activeItem = this.$route.fullPath
  }
};
</script>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
