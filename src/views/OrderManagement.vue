<template>
  <div>
    <el-row :gutter="10" style="margin: 10px">
      <el-col :span="6">
        <el-input
            v-model="orderId"
            size="mini"
            placeholder="订单编号"/>
      </el-col>
      <el-col :span="6" :offset="4">
        <el-input
            v-model="name"
            size="mini"
            placeholder="收件人"/>
      </el-col>
    </el-row>

    <el-table
        :data="tableDataFilter"
        style="width: 100%">
      <el-table-column
          label="订单编号"
          width="200"
          prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.order.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="收件人"
          width="100"
          prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.order.receiverName }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="地址"
          prop="price">
        <template slot-scope="scope">
          <span>{{ scope.row.order.receiverAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="联系电话"
          width="150"
          prop="pnum">
        <template slot-scope="scope">
          <span>{{ scope.row.order.receiverPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="100"
          label="总价">
        <template slot-scope="scope">
          <span>{{ scope.row.order.money }}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="100"
          label="所属用户">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="订单状态">
        <template slot-scope="scope">
          <span>{{ handlePayState(scope.row.order.payState) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="400"
          label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              icon="el-icon-view"
              @click="handleWatch(scope.row)">查看详情
          </el-button>
          <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row,scope.$index)">删除
          </el-button>
          <el-button
              v-if="scope.row.order.payState!==2"
              size="mini"
              type="primary"
              icon="el-icon-s-promotion"
              @click="handleDeliver(scope.row)">发货
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        modal
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
        center>
      <OrderDetail :order="selectOrder"></OrderDetail>
    </el-dialog>
  </div>
</template>


<script>
import OrderDetail from "../components/OrderDetail";
export default {
  name: "OrderManagement",
  components: {OrderDetail},
  data() {
    return {
      selectOrder: {},
      dialogVisible: false,
      tableData: [],
      name: '',
      orderId: ''
    }
  },
  computed: {
    tableDataFilter() {
      return this.tableData.filter(data => !this.name || data.order.receiverName.toLowerCase()
          .includes(this.name.toLowerCase()))
          .filter(data => !this.orderId || data.order.id === this.orderId)
    }
  },
  methods: {
    handleDeliver(row){
      axios({
        url:'deliver/'+row.order.id,
        method:'put'
      }).then((response)=>{
        if (response.data.code===200){
          row.order.payState=2
          this.$message({
            message: "发货完成",
            type: 'success'
          });
        }
      })
    },
    handlePayState(state){
      if (state===0){
        return '未支付'
      }else if (state===1){
        return '待发货'
      }else{
        return '已完成'
      }
    },
    cancelCallback() {
      this.dialogVisible = false
    },
    handleWatch(row) {
      this.selectOrder = row
      this.dialogVisible = true
    },
    handleDelete(row,index) {
      axios({
        url: 'order/' + row.order.id,
        method: 'delete'
      }).then((response) => {
        if (response.data.code === 200) {
          this.$message({
            message: "删除订单成功",
            type: 'success'
          });
          this.tableData.splice(index,1)
        }
      })
    }
  },
  mounted() {
    axios({
      url: 'order',
      method: 'get'
    }).then((response) => {
      if (response.data.code === 200) {
        this.tableData = response.data.data;
      }
    })
  },
}
</script>

<style scoped>

</style>