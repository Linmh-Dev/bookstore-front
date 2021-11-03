<template><!--        <span>{{ this.$route.params.info }}</span>-->


  <div>
    <el-row>
      <el-col :span="24" style="margin-top: 30px;margin-left: 30px;margin-bottom: 20px">
        <el-page-header @back="goBack" content="书籍详情">
        </el-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" style="margin-top: 60px">
        <el-image style="width: 200px;height: 350px" :src="info.imgurl"></el-image>
      </el-col>
      <el-col :span="12" style="text-align: left;margin-top: 40px;margin-left: 20px">
        <div>
         <i class="el-icon-reading"><span style="margin-left: 10px;">{{info.name}}</span></i>
          <el-divider></el-divider>
          <i class="el-icon-discount"><span style="margin-left: 10px;">售价：{{info.price}}</span></i>
          <el-divider></el-divider>
          <i class="el-icon-collection-tag"><span style="margin-left: 10px;">类别：{{info.category}}</span></i>
          <el-divider></el-divider>
          <span>内容简介：{{info.description}}</span>
        </div>

      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="3" :offset="14">
        <el-button v-if="!inCart" icon="el-icon-shopping-cart-2" @click="addCart" type="danger" round>加入购物车</el-button>
        <el-badge v-if="inCart" :value="$store.state.cart.length" class="item">
        <el-button @click="toCart"  icon="el-icon-shopping-cart-2"
                   round>购物车</el-button></el-badge>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-wallet" type="primary" @click="settleAccount" round>去结算</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "BookItem",
  data(){
    return{
    }
  },
  computed:{
    info(){
      return this.$store.state.detail
    },
    inCart(){
      let t = false
      this.$store.state.cart.forEach((data)=>{
        if (this.$store.state.detail.id===data.id){
          t=true
        }
      })
      return t
    }
  },
  methods: {
    toCart(){
      this.$router.push("/cart")
    },
    goBack() {
      this.$router.back()
    },
    settleAccount(){

      this.$router.push("/cart")
    },
    addCart(){
      axios({
        url:'cart/'+this.info.id,
        method:'post',
      }).then( (response) =>{
        if (response.data.code===200)
        this.$store.commit('PUSH_CART',this.$store.state.detail)
      })
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 480px;
}
</style>