<template>
  <div>
    <transition
        appear
        name="animate__animated animate__bounce"
        leave-active-class="animate__backOutDown"
        enter-active-class="animate__backInDown">
      <div id="login" v-loading="loading">
        <el-row>
          <el-col :span="6" :offset="6">

            <h1 style="color: #606266"><i class="el-icon-user-solid"></i> 个人用户登录</h1>
          </el-col>
        </el-row>

        <el-row>
          <el-col id="form" :span="10" :offset="7">
            <el-col :span="16" :offset="3">
              <el-form label-position="right" label-width="80px">
                <el-form-item>
                  <el-input prefix-icon="el-icon-user" placeholder="请输入用户名"
                            v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" @keyup.enter.native="login"
                            v-model="user.pass" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-row>
                    <el-col :span="2" :offset="16">
                      <el-checkbox v-model="user.remember" @keyup.enter.native="login" label="7天内免登录" name="type"></el-checkbox>

                    </el-col>
                  </el-row>

                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="loading"  @click="login" id="bt_login">登录</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-col>
        </el-row>
        <div style="margin: 20px;"></div>

      </div>
    </transition>
  </div>
</template>

<script>
import 'animate.css';

export default {
  name: "Login",
  data() {
    return {
      user: {
        name: '',
        pass: '',
        remember: false,
      },
      loading: false
    };
  },
  computed: {
    rem() {
      return this.user.remember === false ? "off" : "on"
    }
  },
  mounted(){
    if (this.$store.state.loginState === true) {
      this.$router.push("/")
    }
  },
  methods: {
    login: function () {
      this.loading = true;
      axios({
        method: "post",
        url: "login",
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        data: "username=" + this.user.name + "&password=" + this.user.pass + "&remember-me=" +
            this.rem
      }).then((response) => {
        this.loading = false
        if (response.data.code === 200) {
          this.loading = false
          this.$store.commit('CLEAR_CART','')
          this.$store.commit('PUT_LOGIN_STATE', true)
          this.$store.commit('PUT_USERNAME', this.user.name)
          this.$notify({
            title: '登录成功',
            message: '欢迎回来，' + this.user.name + "!",
            type: 'success'
          });
          axios({
            url:'user',
            method:'get'
          }).then((response)=>{
            if (response.data.code === 200) {
              //this.avatar = response.data.data.avatar
              this.$store.commit('PUT_AVATAR',response.data.data.avatar)
            }
          })
          console.log(response.data)
          if (response.data.data.authorities[0].authority.toLowerCase() === 'role_admin'){
            this.$router.push('/admin')
          }else {
            this.$router.push("/")
          }
        } else {
          this.$message({
            message: response.data.data,
            type: 'error'
          });
        }
      }, (error) => {
        this.$message({
          message: error,
          type: 'error'
        });
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
#form {
  padding: 100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

#bt_login {
  width: 200px;
}
</style>