<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input
            v-model="orderId"
            size="mini"
            placeholder="商品编号"/>
      </el-col>
      <el-col :span="6" :offset="4">
        <div style="text-align: left">
          <el-select size="mini" v-model="category" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="success" @click="addBook" round icon="el-icon-plus">添加书籍</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="6">
        <el-input
            v-model="name"
            size="mini"
            placeholder="商品名称"/>
      </el-col>
      <el-col :span="6" :offset="4" style="text-align: left">
        <div style="display: inline-flex;text-align: left">
          <el-input
              size="mini"
              placeholder="最低价格"
              v-model="minPrice">
          </el-input>
          <strong style="margin-left: 5px;margin-right: 5px"> - </strong>
          <el-input
              size="mini"
              placeholder="最高价格"
              v-model="maxPrice">
          </el-input>
        </div>

      </el-col>
    </el-row>

    <el-table
        :data="tableDataFilter"
        style="width: 100%">
      <el-table-column
          label="商品编号"
          prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="商品名称"
          prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="商品价格"
          prop="price">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="商品库存"
          prop="pnum">
        <template slot-scope="scope">
          <span>{{ scope.row.pnum }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="商品类别"
          prop="category">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row,scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        modal
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        center>
      <AddBook :book="selectBook" :cancel="cancelCallback"/>
    </el-dialog>
  </div>
</template>

<script>
import AddBook from "./AddBook";

export default {
  name: "ProductManagement",
  components: {AddBook},
  data() {
    return {
      selectBook: null,
      dialogVisible: false,
      tableData: [],
      category: '',
      name: '',
      orderId: '',
      minPrice: 0,
      maxPrice: 1000,
      options: [{
        value: '1',
        label: '文学'
      }, {
        value: '2',
        label: '生活'
      }, {
        value: '3',
        label: '计算机'
      }, {
        value: '4',
        label: '外语'
      }, {
        value: '5',
        label: '经营'
      }, {
        value: '6',
        label: '励志'
      }, {
        value: '7',
        label: '科学'
      }, {
        value: '8',
        label: '学术'
      }, {
        value: '9',
        label: '少儿'
      }, {
        value: '10',
        label: '艺术'
      }, {
        value: '11',
        label: '科技'
      }, {
        value: '12',
        label: '考试'
      }, {
        value: '13',
        label: '生活百科'
      }],
    }
  },
  computed: {
    tableDataFilter() {
      return this.tableData.filter(data => !this.name || data.name.toLowerCase()
          .includes(this.name.toLowerCase()))
          .filter(data => !this.orderId || data.id === this.orderId)
          .filter(data => !this.category || data.category === this.category)
          .filter(data => data.price >= this.minPrice && data.price <= this.maxPrice)
    }
  },
  methods: {
    addBook(){
      this.dialogVisible=true;
    },
    cancelCallback() {
      this.dialogVisible = false
      axios({
        url: 'book',
        method: 'get'
      }).then((response) => {
        if (response.data.code === 200) {
          let temp = response.data.data;
          temp.forEach(function (data) {
            data.editState = false
          })
          this.tableData = temp
        }
      })
    },
    handleEdit(row) {
      this.selectBook = row
      this.dialogVisible = true
    },
    handleDelete(row,index) {
      console.log(index)
      axios({
        url: 'book/' + row.id,
        method: 'delete'
      }).then((response) => {
        if (response.data.code === 200) {
          this.$message({
            message: "删除《" + row.name + "》成功",
            type: 'success'
          });
          this.tableData.splice(index,1)
        }
      })
    }
  },
  mounted() {
    axios({
      url: 'book',
      method: 'get'
    }).then((response) => {
      if (response.data.code === 200) {
        let temp = response.data.data;
        temp.forEach(function (data) {
          data.editState = false
        })
        this.tableData = temp
      }
    })
  },
}
</script>

<style scoped>

</style>