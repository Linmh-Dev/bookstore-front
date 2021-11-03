<template>
  <el-row>
    <el-col :span="6">
      <el-date-picker
          v-model="value2"
          type="month"
          value-format="timestamp"
          placeholder="选择月份">
      </el-date-picker>
    </el-col>
    <el-col :span="2">
      <el-button> <el-link :href="$store.state.url+'/hotSaleList?date='+value2"  type="primary" >下载</el-link></el-button>

    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "HotBookList",
  data(){
    return{
      value2: '',
    }
  },
}
</script>

<style scoped>

</style>