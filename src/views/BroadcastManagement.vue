<template>
  <div>
    <el-row>
      <el-col :span="2" :offset="20">
        <el-button type="warning" @click="addNotice" icon="el-icon-plus"></el-button>
      </el-col>
    </el-row>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="公告标题"
          width="150"
          prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="公告内容"
          width="500"
          prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.details}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="发布时间"
          width="200"
          prop="price">
        <template slot-scope="scope">
          <span>{{ scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="400"
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
        width="60%"
        center>
      <el-form  label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="notice.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input
              rows="5"
              type="textarea"
                    placeholder="请输入内容"
                    maxlength="200"
                    show-word-limit
                    v-model="notice.details"></el-input>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BroadcastManagement",
  data(){
    return{
      tableData: [],
      dialogVisible:false,
      notice:{},
      isAdd:false,
    }
  },
  methods:{
    handleEdit(row){
      this.notice=row
      this.isAdd=false
      this.dialogVisible = true;
    },
    handleDelete(row,index){
      axios({
        url:'notice/'+row.id,
        method:'delete'
      }).then((response)=>{
        if (response.data.code===200){
          this.$message({
            message: "删除成功",
            type: 'success'
          });
          this.tableData.splice(index,1)
        }
      })

    },
    addNotice(){
      this.isAdd=true
      this.dialogVisible = true;
    },
    onSubmit(){
      if (this.isAdd){
        axios({
          url:'notice',
          method:'post',
          data:this.notice
        }).then((response)=>{
          if (response.data.code===200){
            this.dialogVisible=false
            this.$message({
              message: "添加公告成功",
              type: 'success'
            });
          }else{
            this.$message({
              message: "添加公告失败",
              type: 'error'
            });
          }
          axios({
            url: 'noticeAll',
            method:'get'
          }).then((response)=>{
            if (response.data.code === 200) {
              this.tableData = response.data.data
            }
          })
        })
      }else{
        axios({
          url:'notice',
          method:'put',
          data:this.notice
        }).then((response)=>{
          if (response.data.code===200){
            this.dialogVisible=false
            this.$message({
              message: "修改公告成功",
              type: 'success'
            });
          }else{
            this.$message({
              message: "修改公告失败",
              type: 'error'
            });
          }
        })
      }
    }
  },
  mounted() {
    axios({
      url: 'noticeAll',
      method:'get'
    }).then((response)=>{
      if (response.data.code === 200) {
        this.tableData = response.data.data
      }
    })
  }
}
</script>

<style scoped>

</style>