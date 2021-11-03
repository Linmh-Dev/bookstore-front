<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4" style="margin-top: 5px">
        <el-steps :active="2" finish-status="success" simple style="margin-top: 20px">
          <el-step title="选购"></el-step>
          <el-step title="确认订单"></el-step>
          <el-step title="付款"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </el-col>
    </el-row>


    <el-row  v-loading.fullscreen.lock="loading">
      <el-col :span="14" :offset="4" style="margin-top: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单信息</span>
          </div>
          <div style="text-align: left">
            <div style="margin-top: 10px;margin-bottom: 10px" v-for="book in $store.state.cart" :key="book.id" class="text item">
              <el-tag size="medium" effect="plain" >{{ book.name }}</el-tag>
              <strong style="margin-left: 10px">{{" x " + book.num }}</strong>
            </div>
            <div style="float: right;margin: 10px">
              <span>合计：{{ sum }}</span>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="4" style="margin-top: 20px">
        <div v-if="address != null && dialogVisible===false">
          <div style="float: right;margin: 10px">
            <el-button size="small" type="primary" @click="addAddress">切换地址</el-button>
          </div>
          <el-descriptions  :column="1" border title="收货地址">
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                用户名
              </template>
              {{ address.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
              </template>
              {{ address.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                联系地址
              </template>
              {{ addressDetail }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                备注
              </template>
              <el-tag size="small">{{ address.desc }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div v-else>
          <el-empty description="还没有收货地址">
            <el-button type="primary" @click="addAddress">添加收货地址</el-button>
          </el-empty>
        </div>

      </el-col>
    </el-row>

    <el-dialog
        modal
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        center>
      <AddressPicker :callback="callback"/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveAddress">保  存</el-button>
  </span>
    </el-dialog>

    <el-row style="margin-top: 40px">
      <el-col :span="2" :offset="16">
        <el-button icon="el-icon-goods" @click="$router.push('/shop')" plain round>取消</el-button>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-bank-card" type="danger" @click="settleAccount" round>付款</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AddressPicker from "../components/AddressPicker";

export default {
  name: "Payment",
  components: {AddressPicker},
  data() {
    return {
      dialogVisible: false,
      address: null,
      loading:false
    }
  },
  mounted() {
    axios({
      url: "address",
      method: 'get'
    }).then((response) => {
      if (response.data.code === 200) {
        this.address = response.data.data
      }
    });
  },
  computed: {
    sum() {
      let total = 0;
      this.$store.state.cart.forEach(function (value) {
        total += (value.num * value.price)
      })
      return total.toFixed(2);
    },
    addressDetail() {
      return this.address.province + this.address.city + this.address.district + this.address.detail;
    }
  },
  methods: {
    addAddress() {
      this.dialogVisible = true
    },
    settleAccount() {
      this.loading=true
      axios({
        url: 'order/',
        method: 'put',
        data: {
          id: this.$store.state.currOrderID,
          receiverName: this.address.name,
          receiverPhone: this.address.phone,
          receiverAddress: this.addressDetail
        }
      }).then((response) => {
        if (response.data.code === 200) {
          setTimeout(() => {
            this.loading=false
            this.$router.push('/complete')
          }, 3000)
        }
      })
    },
    callback(address) {
      this.address = address
    },
    saveAddress() {
      axios({
        method: 'post',
        url: 'address',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.address
      }).then((response) => {
        console.log(response)
      })
      this.dialogVisible = false;
    }
  }
}
</script>

<style scoped>

</style>