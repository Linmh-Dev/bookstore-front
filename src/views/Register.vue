<template>
  <div id="register">
    <el-row>
      <el-col :span="6" :offset="9">
        <h1 style="color: #606266"><i class="el-icon-user-solid"></i> 新用户注册</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form
            status-icon
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            label-width="100px"
            class="demo-ruleForm">

          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input
                type="password"
                show-password
                v-model="ruleForm.pass"
            ></el-input>
          </el-form-item>

          <el-form-item label="重复密码" prop="verifyPass">
            <el-input
                type="password"
                show-password
                v-model="ruleForm.verifyPass"
            ></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="10">
              <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>


          <el-form-item label="手机号码" prop="telphone">
            <el-input type="tel" v-model="ruleForm.telephone"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="个人介绍" prop="introduce">
            <el-input type="textarea" maxlength="100" v-model="ruleForm.introduce"></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="verifyCode">
            <el-row>
              <el-col :span="6">
                <el-input type="tel" v-model="ruleForm.validateCode"></el-input>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-image v-if="showValidate" :src="validateUrl"></el-image>
              </el-col>
              <el-col :span="10"> <el-link :underline="false" @click="switchValidate" type="primary">看不清？换一张</el-link></el-col>
            </el-row>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
            >注册
            </el-button
            >
            <el-button @click="resetForm('ruleForm')">重填</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>
<script>
var emailRegex = /^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,4}$/;
var nameRegex = /^[a-zA-Z]\w{0,9}$/;
var passRegex = /^.{6,16}$/;
var telphoneRegex = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
export default {
  name: "Register",

  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        console.log(this.ruleForm.email)
        if (!emailRegex.test(value)) {
          callback(new Error('请输入有效的邮箱地址'))
        }
        callback();
      }
    };
    var verifyCode = (rule, value, callback) => {
      callback()
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入会员名'));
      } else {
        if (!nameRegex.test(value)) {
          callback(new Error("字母数字下划线1到10位，不能是数字开头"))
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!passRegex.test(value)) {
          callback(new Error("密码不合法"))
        }
        callback();
      }
    };
    var validateVerifyPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateTelPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else {
        if (!telphoneRegex.test(value)) {
          callback(new Error('请输入有效的手机号码'))
        }
        callback();
      }
    };
    return {
      showValidate:true,
      validateUrl:this.$store.state.url+'/validateCode',
      ruleForm: {
        name: "",
        introduce: "",
        pass: "",
        gender: "男",
        email: "",
        telephone: "",
        verifyPass: "",
        validateCode: ""
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        verifyPass: [
          {validator: validateVerifyPass, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        telephone: [
          {validator: validateTelPhone, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    switchValidate(){
      this.validateUrl=this.$store.state.url+'/validateCode?'+Math.random()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            url: 'user',
            data: this.ruleForm
          }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
              this.$message({
                message: "注册成功",
                type: 'success'
              });
              this.$router.push('/login')
            } else {
              this.$message({
                message: response.data.data,
                type: 'error'
              });
            }

          })
        } else {
          console.log("error")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.ruleForm = {
        name: "",
        introduce: "",
        pass: "",
        gender: "男",
        email: "",
        telephone: "",
        verifyPass: ""
      }
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
#register {
  margin-top: 10px;
}
</style>


