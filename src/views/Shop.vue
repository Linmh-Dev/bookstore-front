<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="'文学'" @select="handleSelect">
          <el-menu-item style="width: 200px" index="文学">
            <div style="width:170px">
              <span>文学</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>

          <el-menu-item index="生活">
            <div style="width:170px">
              <span>生活</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>

          <el-menu-item index="计算机">
            <div style="width:170px">
              <span>计算机</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>

          <el-menu-item index="外语">
            <div style="width:170px">
              <span>外语</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>

          <el-menu-item index="经营">
            <div style="width:170px">
              <span>经营</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="励志">
            <div style="width:170px">
              <span>励志</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="科学">
            <div style="width:170px">
              <span>科学</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="学术">
            <div style="width:170px">
              <span>学术</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="少儿">
            <div style="width:170px">
              <span>少儿</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="艺术">
            <div style="width:170px">
              <span>艺术</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="科技">
            <div style="width:170px">
              <span>科技</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="考试">
            <div style="width:170px">
              <span>考试</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
          <el-menu-item index="生活百科">
            <div style="width:170px">
              <span>生活百科</span>
              <span style="float: right"> <i class="el-icon-arrow-right"></i></span>
            </div>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-container>
        <el-main>
          <el-row>
           <el-col v-if="bookList===null || bookList.length===0">
              <el-empty description="没有上架的书籍"></el-empty>
            </el-col>

            <el-col :span="5" v-for="item in bookList" :key="item.id">
              <div @click="ck(item)">
                <img style="width: 120px;height: 180px;margin: 20px" :src="$store.state.url+item.imgurl" class="image">
                <div style="padding: 14px;">
                  <span>{{ item.name }}</span>
                  <div class="bottom">
                    <span class="el-icon-price-tag">{{ item.price }}</span>
                  </div>
                </div>
              </div>
            </el-col>


          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import 'animate.css'
var fetchData = function (index, fun) {
  axios({
    method: "get",
    url: "book/" + index,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  }).then((response) => {
    if (response.data.code === 200) {
      fun(response)
    } else {
     // console.log(response.data)
    }
  }, (error) => {
    //console.log(error)
  })
}
export default {
  name: "Shop",
  data() {
    return {

    }
  },
  computed:{
    bookList(){
      return this.$store.state.bookList
    }
  },
  mounted() {
    fetchData('文学', (response) => {
      this.$store.commit("PUT_BOOK_LIST",response.data.data)
    })
  },
  methods: {
    handleSelect: function (index) {
      this.$store.commit("CLEAR_CART");
      fetchData(index, (response) => {
        //this.bookList = response.data.data
        this.$store.commit("PUT_BOOK_LIST",response.data.data)
      })
    },
    ck: function (book) {
      this.$store.commit("PUT_DETAIL",book)
      this.$router.push({name: "BookDetail"})
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>