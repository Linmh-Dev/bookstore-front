<template>
<div>
  <el-row>
    <el-col :span="22" :offset="1" style="margin-top: 10px">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">

        <el-tab-pane label="未付款" name="0">
          <div v-for="i in orderInfo" :key="i.order.id">
            <order-item  :order-info="i" :type="0"/>
          </div>
          <div v-if="orderInfo.length===0">
            <el-empty description="暂时还没有订单"></el-empty>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="1">
          <div v-for="i in orderInfo" :key="i.order.id">
            <order-item  :order-info="i" :type="1"/>
          </div>
          <div v-if="orderInfo.length===0">
            <el-empty description="暂时还没有订单"></el-empty>
          </div>

        </el-tab-pane>
        <el-tab-pane label="已完成" name="2">
          <div v-for="i in orderInfo" :key="i.order.id">
            <order-item  :order-info="i" :type="2"/>
          </div>
          <div v-if="orderInfo.length===0">
            <el-empty description="暂时还没有订单"></el-empty>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</div>
</template>

<script>
import 'animate.css'
import OrderItem from "../components/OrderItem";
var fetchOrders = function (state,callback) {
  axios({
    url:'orderInfo/'+state,
    method:'get'
  }).then(callback)
}
export default {
  name: "Order",
  components: {OrderItem},
  data() {
    return {
      activeName: '1',
      orderInfo:[]
    };
  },
  mounted() {
    fetchOrders(this.activeName,(response)=>{
      this.orderInfo = response.data.data

    })
  },
  methods: {
    handleClick(tab, event) {
      fetchOrders(this.activeName,(response)=>{
        this.orderInfo = response.data.data

      })
    }
  }
}
</script>

<style scoped>

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>