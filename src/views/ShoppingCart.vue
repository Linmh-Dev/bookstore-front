<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4" style="margin-top: 5px">
        <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
          <el-step title="购物车"></el-step>
          <el-step title="确认订单"></el-step>
          <el-step title="付款"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="4" style="margin-top: 20px">
        <el-table
            :data="tableData"
            style="width: 100%"
            height="340">
          <el-table-column
              fixed
              align="center"
              prop="id"
              label="序号"
              width="100">
          </el-table-column>
          <el-table-column
              align="center"
              prop="name"
              label="商品名称"
              width="200">
          </el-table-column>
          <el-table-column
              align="center"
              prop="price"
              label="价格"
              width="140">
          </el-table-column>
          <el-table-column
              align="center"
              prop="num"
              label="数量"
              width="190">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num"  size="small" :min="1" :max="scope.row.pnum"></el-input-number>
            </template>

          </el-table-column>
          <el-table-column
              align="center"
              prop="pnum"
              label="库存"
              width="200">
          </el-table-column>
          <el-table-column
              align="center"
              label="小计"
              width="150">
            <template slot-scope="scope">
              <span>{{ (scope.row.num*scope.row.price).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row,scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="14" style="margin-top: 20px">
        <span>合计：{{sum}}</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 40px">
      <el-col :span="2" :offset="16">
        <el-button icon="el-icon-goods" @click="back" plain round>继续购物</el-button>
      </el-col>
      <el-col :span="2">
        <el-button v-if="$store.state.cart.length>0"
                   icon="el-icon-bank-card" type="danger"
                   @click="settleAccount" round>提交订单</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
  computed:{
    tableData(){
      return this.$store.state.cart
    },
    sum(){
      let total = 0;
      this.tableData.forEach(function (value) {
        total +=(value.num*value.price)
      })
      return total.toFixed(2)
    }
  },
  watch:{
    tableData:{
      handler(value){
        value.forEach((value)=>{
          if (value.num != null){
            axios({
              url:'cart/'+value.id+"/"+value.num,
              method:'put'
            }).then(function (response) {

            })
          }

        })
      },
      deep:true
    }
  },
  mounted() {
   this.$store.dispatch('addCart')
  },
  methods: {
    settleAccount() {
      axios({
        url:'order',
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        data:{
          money:this.sum
        }
      }).then( (response)=> {
        console.log(response.data)
        if (response.data.code === 200){
          this.$store.commit('PUT_ORDER_ID',response.data.data.id)
          this.$router.push("/payment")
        }
      })
    },
    handleDelete(row,index){
      axios({
        url:'cart/'+row.id,
        method:'delete'
      }).then((response)=>{
        if (response.data.code===200)
        this.$store.commit('REMOVE_CART',index)
      })
    },
    back(){
      this.$router.push("/shop")
    }
  }
}
</script>

<style scoped>

</style>