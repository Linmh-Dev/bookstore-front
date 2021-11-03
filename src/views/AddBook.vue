<template>
<div>
  <el-row>
    <el-col :span="10" :offset="4" style="margin-top: 20px">
      <el-form ref="form" :model="form" label-width="80px">
<!--        <el-form-item label="书籍ID">
          <el-input v-model="form.id"></el-input>
        </el-form-item>-->
        <el-form-item label="书名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <div style="text-align: left">
            <el-input-number controls-position="right" size="small" v-model="form.price" :precision="2" :min="0" :step="1.0" :max="1000"></el-input-number>
          </div>
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group v-model="form.category">
            <div style="text-align: left">
              <el-radio :label="'文学'">文学</el-radio>
              <el-radio :label="'生活'">生活</el-radio>
              <el-radio :label="'计算机'">计算机</el-radio>
              <el-radio :label="'外语'">外语</el-radio>
              <el-radio :label="'经营'">经营</el-radio>
              <el-radio :label="'励志'">励志</el-radio>
              <el-radio :label="'科学'">科学</el-radio>
              <el-radio :label="'学术'">学术</el-radio>
              <el-radio :label="'少儿'">少儿</el-radio>
              <el-radio :label="'艺术'">艺术</el-radio>
              <el-radio :label="'科技'">科技</el-radio>
              <el-radio :label="'考试'">考试</el-radio>
              <el-radio :label="'生活百科'">生活百科</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="库存数量">
          <div style="text-align: left">
            <el-input-number  size="small" v-model="form.pnum" :min="0" :max="10000" ></el-input-number>
          </div>
        </el-form-item>
        <el-form-item label="书籍描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item label="封面">
          <el-upload
              ref="upload"
              class="upload-demo"
              drag
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :multiple="false"
              :auto-upload="false"
              :limit="1"
              :file-list="fileList"
              name="cover"
              :action="$store.state.url+'/bookCover'">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "AddBook",
  props:['book','cancel'],
  data() {
    return {
      update:false,
      fileList: [],
        form: {
        name: '',
        pnum: 0,
        price: 0,
        category: '',
        description: '',
        imgurl:''
      }
    }
  },
  mounted() {
    console.log(this.book)
    if (this.book!=null){
      this.form=this.book
      this.update=true
    }
  },
  methods: {
    clear(){
      this.form={
        id:'',
        name: '',
        pnum: 0,
        price: 0,
        category: '',
        description: '',
        imgurl:''
      }
      this.fileList = [];
    },
    uploadSuccess(response, file, fileList){
      console.log(response.data)
      if (response.code===200){
        this.form.imgurl = response.data
        axios({
          method: "post",
          url:"book",
          headers:{
            'Content-Type': 'application/json'
          },
          data:this.form
        }).then( (response)=> {
          console.log(response)
          this.$message({
            message: "上传成功 ",
            type: 'success'
          });
          this.cancel()
        },  (error)=> {
          console.log(error)
        })
      }else {
        console.log("上传失败")
      }
      this.clear()
    },
    uploadError(err, file, fileList){
      console.log("上传失败")
      this.clear()
    },
    onSubmit() {
      if (this.update){
        axios({
          url:'book',
          method:'put',
          headers:{
            'Content-Type': 'application/json'
          },
          data:this.form
        }).then((response)=>{
          if (response.data.code===200){
            this.$message({
              message: "修改成功",
              type: 'success'
            });
            this.cancel()
          }
        })
      }else{
        this.$refs.upload.submit()
      }
    }
  }
}
</script>

<style scoped>

</style>