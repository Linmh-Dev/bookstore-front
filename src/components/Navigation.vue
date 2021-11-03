<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/shop">购物</el-menu-item>
      <el-menu-item index="/cart">
         购物车
      </el-menu-item>

      <div style="float: right;margin: 10px 30px">
        <el-dropdown placement="bottom" @command="onCommand">

          <span style="display: inline-flex">
         <el-image style="margin-right: 5px;;width:40px;height:40px;border-radius:100px;" :src="avatarUrl">
          </el-image>
          <strong style="margin: auto auto">{{ $store.state.username }}</strong>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid" v-if="$store.state.loginState" command="/person">个人中心
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-tickets" v-if="$store.state.loginState" command="/order">我的订单
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-user" v-if="!$store.state.loginState" command="/login">登录
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" v-if="$store.state.loginState" command="logout">退出登录
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline" v-if="!$store.state.loginState" command="/register">注册
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="display: inline-flex;width: 20%;margin: 10px 50px;float: right">
        <el-autocomplete
            style=" width: 100%"
            class="inline-input"
            @keyup.enter.native="searchBook"
            placeholder="请输入书名"
            prefix-icon="el-icon-search"
            v-model="searchContent"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            @select="onSelect"
        ></el-autocomplete>
      </div>
    </el-menu>

  </div>
</template>

<script>

export default {
  name: "Navigation",
  data() {
    return {
      avatar: '',
      searchContent: ''
    }
  },
  computed: {
    avatarUrl(){
      if (!this.$store.state){
        return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
      if (this.$store.state.avatar === "") {
        return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }else if (this.$store.state.avatar  !== null){
        return this.$store.state.url+this.$store.state.avatar
      }
      else {
        return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    },
    activeIndex() {
      return this.$store.state.indicator
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key in ['/','/shop','/cart']){
        this.$store.commit('PUT_INDICATOR', "")
      }else {
        this.$store.commit('PUT_INDICATOR', '/')
      }
      this.$router.push(key)
    },
    onSelect(item) {
      console.log(item);
      this.$store.commit("PUT_DETAIL", item.data)
      this.$router.push('/detail')
    },
    searchBook() {
      axios({
        url: 'searchBook/' + this.searchContent,
        method: 'get'
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === 200) {
          this.$store.commit("PUT_DETAIL", response.data.data)
          this.$router.push('/detail')
        } else {
          this.$notify({
            title: response.data.data,
            type: 'error'
          });
        }
      })
    },
    querySearch(queryString, cb) {
      axios({
        url: 'bookKey/' + queryString,
        method: 'get'
      }).then((response) => {
        if (response.data.code === 200) {
          let temp = []
          response.data.data.forEach(function (item) {
            temp.push({'value': item.name, data: item})
          })
          cb(temp)
        }

      })
    },
    onCommand(command) {
      if (command === 'logout') {
        axios({
          method: "get",
          url: "out",
        }).then((response) => {
          this.$store.commit('PUT_LOGIN_STATE', false)
          this.$store.commit('PUT_USERNAME', '')
          this.$store.commit('PUT_AVATAR',"")
          this.$router.push('/login')

        })
      } else {
        if (this.$route.fullPath !== command)
          this.$router.push(command)
      }
    }
  },
  mounted() {
    this.$store.commit('PUT_INDICATOR', this.activeIndex)
  }
}
</script>

<style scoped>

</style>