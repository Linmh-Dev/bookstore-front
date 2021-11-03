<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          width="150"
          label="用户名"
          prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="180"
          label="密码">
        <template slot-scope="scope">
          <span>{{ scope.row.pass }}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="80"
          label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="120"
          label="状态">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.state===0?'success':'danger'">
            {{ stateConverter(scope.row.state) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="身份">
        <template slot-scope="scope">
          <span>{{ roleConverter(scope.row.role) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="注册时间">
        <template slot-scope="scope">
          <span>{{ timeConverter(scope.row.registTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="100">
        <template slot-scope="scope">
          <el-button
              size="mini"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
          width="100">
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

    <el-dialog
        modal
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        center>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="selectUser.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="selectUser.pass"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="selectUser.gender" placeholder="请选择">
                <el-option
                    v-for="item in sex"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="selectUser.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="selectUser.telephone"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="selectUser.state" placeholder="请选择">
                <el-option
                    v-for="item in state"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份">
              <el-select v-model="selectUser.role" placeholder="请选择">
                <el-option
                    v-for="item in role"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Register from "./Register";

export default {
  name: "UserManagement",
  components: {Register},
  data() {
    return {
      selectUser: {},
      tableData: [],
      dialogVisible: false,
      sex: [{
        value: '男'
      }, {
        value: '女'
      }],
      state: [{
        value: -1,
        label: '禁用'
      }, {
        value: 0,
        label: '激活'
      }],
      role: [
        {
          value: "普通用户",
          label: '普通用户'
        }, {
          value: "Admin",
          label: '管理员'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      axios({
        url: 'user',
        method: 'put',
        data: this.selectUser
      }).then((response) => {
        if (response.data.code === 200) {
          this.dialogVisible = false
          this.$message({
            message: "保存成功",
            type: 'success'
          });
        } else {
          this.$message({
            message: "保存失败",
            type: 'error'
          });
        }
      })
    },
    handleEdit(row) {
      this.selectUser = row
      this.dialogVisible = true
    },
    stateConverter(state) {
      if (state === 0) {
        return "已激活"
      } else {
        return "已禁用"
      }
    },
    timeConverter(time) {
      return time.split("T")[0]
    },
    roleConverter(role) {
      if (role === "Admin") {
        return "管理员"
      }
      return role
    },
    handleDelete(row, index) {
      axios({
        url:"user/"+row.id,
        method:'delete'
      }).then((response)=>{
        if (response.data.code === 200) {
          this.dialogVisible = false
          this.$message({
            message: "删除成功",
            type: 'success'
          });
        this.tableData.splice(index,1)
        } else {
          this.$message({
            message: "删除失败",
            type: 'error'
          });
        }
      })
    }
  },
  mounted() {
    axios({
      url: 'user/all',
      method: 'get'
    }).then((response) => {
      if (response.data.code === 200) {
        this.tableData = response.data.data
      }
    })
  }
}
</script>

<style scoped>

</style>