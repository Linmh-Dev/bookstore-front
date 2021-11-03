<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="9">
        <el-image style="margin-top: 10px;width:120px;height:120px;border-radius:100px;"
                   fit="fill"
                   :src="avatarUrl"></el-image>
      </el-col>
    </el-row>
    <el-row>
      <el-col
          :span="6" :offset="9">
        <el-upload
            style="margin: 15px"
            class="upload-demo"
            :show-file-list="false"
            auto-upload
            :file-list="fileList"
            name="avatar"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :action="$store.state.url+'/avatar'"
            :limit="1">
          <el-button @click="fileList=[]" :size="'small'" round>更换头像</el-button>
        </el-upload>
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
                show-password
                type="password"
                v-model="ruleForm.pass"
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
            <el-input type="textarea" maxlength="200"
                      show-word-limit
                      :rows="4"
                      v-model="ruleForm.introduce"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" plain @click="submitForm('ruleForm')">保存
            </el-button>
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
  name: "Person",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (!emailRegex.test(value)) {
          callback(new Error('请输入有效的邮箱地址'))
        }
        callback();
      }
    };
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
      fileList: [],
      ruleForm: {
        name: "",
        introduce: "",
        pass: "",
        gender: "男",
        email: "",
        telephone: "",
        avatar: null,
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        telephone: [
          {validator: validateTelPhone, trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    avatarUrl() {
      if (this.ruleForm.avatar === "") {
        return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      } else if (this.ruleForm.avatar !== null) {
        return this.$store.state.url + this.ruleForm.avatar
      } else {
        return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    }
  },
  mounted() {
    axios({
      url: 'user',
      method: 'get'
    }).then((response) => {
      if (response.data.code === 200) {
        this.ruleForm = response.data.data
      }
    })
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.ruleForm.avatar = response.data
      } else {
        console.log("上传失败")
      }
    },
    uploadError(err, file, fileList) {
      console.log("上传失败")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改用户信息
          axios({
            url: "user",
            method: 'put',
            data: this.ruleForm
          }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
              this.$message({
                message: "修改个人信息成功",
                type: 'success'
              });
              axios({
                url: 'user',
                method: 'get'
              }).then((response) => {
                if (response.data.code === 200) {
                  this.ruleForm = response.data.data
                  this.$store.commit('PUT_AVATAR', this.ruleForm.avatar)
                }
              })

            } else {
              this.$message({
                message: "修改失败",
                type: 'error'
              });
            }
          })
        }
      });
    }
  },
}
</script>

<style scoped>

</style>