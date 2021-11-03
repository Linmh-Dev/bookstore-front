<template>
  <div v-show="isShow">
    <transition
        :appear="true"
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeIn">
      <el-row  style="margin: 10px">
        <el-col :span="20" :offset="1">
          <el-card class="box-card" shadow="hover">
            <div style="text-align: left">
              <table width="100%">
                <tr>
                  <td>
                    <div>
                      <span>订单编号：{{orderInfo.order.id}}</span>
                    </div>
                    <div v-for="item in orderInfo.orderItems" :key="item.product_id">
                      <div style="margin-top: 10px;margin-left: 10px;display: inline-flex">
                        <el-image
                            style="width: 50px; height: 50px;margin: 5px"
                            :src="$store.state.url+item.book.imgurl"
                            :fit="'fill'"></el-image>
                        <span style=" margin:auto 30px">{{item.book.name}}</span>
                        <span style=" margin:auto 5px">X {{item.buyNum}}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style="text-align: right">
                      <el-button v-if="type===0" type="primary" @click="onCancel" round>取消订单</el-button>
                      <el-button v-if="type===1" type="primary" @click="onCancel" round>退款</el-button>
                      <el-button v-if="type===2" type="primary" @click="reputation" round>评价</el-button>
                      <el-button v-if="type===0" type="danger" @click="payment" round>付款</el-button>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "OrderItem",
  props:["orderInfo",'type'],
  data(){
    return{
      isShow: true
    }
  },
  methods:{
    reputation(){

    },
    onCancel(){
      axios({
        url:'order/'+this.orderInfo.order.id,
        method:'delete'
      }).then((response)=> {
        if (response.data.code === 200){
          this.$notify({
            title: '退款成功',
            message:'',
            type: 'success'
          });
          this.isShow = false
        }
      })
    },
    payment(){
      axios({
        url:'order',
        method:'put',
        data:this.orderInfo.order
      }).then( (response)=> {
        if (response.data.code === 200){
          this.$notify({
            title: '支付成功',
            message:'',
            type: 'success'
          });
          this.isShow = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>