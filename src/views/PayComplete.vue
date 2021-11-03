<template>
<div>
  <el-row>
    <el-col :span="16" :offset="4" style="margin-top: 5px">
      <el-steps :active="4" finish-status="success" simple style="margin-top: 20px">
        <el-step title="选购" ></el-step>
        <el-step title="确认订单" ></el-step>
        <el-step  title="付款" ></el-step>
        <el-step title="完成" ></el-step>
      </el-steps>
    </el-col>
  </el-row>

<el-row align="center">
  <el-col :span="6" :offset="8" style="margin-top: 80px">
    <div style="display: inline-flex">
      <el-image
          style="width: 150px; height: 150px"
          :src="require('../assets/complete.svg')"
          fit="fill"></el-image>
      <h1 style="margin:auto 30px">支付成功</h1>
    </div>

  </el-col>
</el-row>
  <el-row style="margin-top: 60px">
    <el-col :span="2" :offset="9">
      <el-button icon="el-icon-house" @click="home" plain  round>返回首页</el-button>
    </el-col>
    <el-col :span="2">
      <el-button icon="el-icon-tickets" @click="allOrder" plain   round>查看订单</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "PayComplete",
  data(){
    return{

    }
  },
  methods:{
    home(){
      this.$router.push("/")
    },
    allOrder(){
      this.$router.push("/order")
    }
  }
}
</script>

<style scoped>

</style>