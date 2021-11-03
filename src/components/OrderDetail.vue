<template>
  <div>
    <el-descriptions class="margin-top" title="订单详细信息" :column="3">
      <el-descriptions-item label="订单编号">{{order.order.id}}</el-descriptions-item>
      <el-descriptions-item label="所属用户">{{order.username}}</el-descriptions-item>
      <el-descriptions-item label="收件人">{{order.order.receiverName}}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{order.order.receiverPhone}}</el-descriptions-item>
      <el-descriptions-item label="收货地址">{{order.order.receiverAddress}}</el-descriptions-item>
      <el-descriptions-item label="总价">{{order.order.money}}</el-descriptions-item>
      <el-descriptions-item label="下单时间">{{timeConvertor(order.order.orderTime)}}</el-descriptions-item>

    </el-descriptions>

    <div>
      <el-table
          :data="order.orderItems"
          style="width: 100%">
        <el-table-column
            label="商品编号">
          <template slot-scope="scope">
            <span>{{ scope.row.book.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="商品">
          <template slot-scope="scope">
            <el-image style="height: 80px;width: 50px" :src="$store.state.url+scope.row.book.imgurl"/>
          </template>
        </el-table-column>
        <el-table-column
            label="商品名称"
            prop="name">
          <template slot-scope="scope">
            <span>{{ scope.row.book.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="商品价格"
            prop="price">
          <template slot-scope="scope">
            <span>{{ scope.row.book.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="购买数量">
          <template slot-scope="scope">
            <span>{{ scope.row.buyNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="商品类别"
            prop="category">
          <template slot-scope="scope">
            <span>{{ scope.row.book.category }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="商品描述">
          <template slot-scope="scope">
            <span>{{ scope.row.book.description }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  tableData:[],
  props:['order'],
  methods:{
    timeConvertor(date){
      return date.split('T')[0]
    }
  }
}
</script>

<style scoped>

</style>