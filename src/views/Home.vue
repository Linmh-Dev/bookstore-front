<template>
  <div class="home">
    <el-row>
      <el-col :span="18" :offset="3" style="margin-top: 30px">
        <el-carousel :interval="4000" arrow="hover" height="300px">
          <el-carousel-item v-for="item in pictures" :key="item">
            <el-image style="height:100%;width:100%;" :key="item" :src="require('../assets/'+item)"
                      :fit="'non'"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-row style="margin-top: 30px">

      <el-col :span="8" :offset="3">
        <el-card class="box-card" style="width:100%;height: 400px">
          <div slot="header" style="text-align: left" class="clearfix">
            <i class="el-icon-chat-line-round"> 公告板</i>
          </div>
          <div class="text item" style="text-align: center">
            <h3>{{ title }}</h3><br><br>
            <strong v-for="i in content" :key="i">{{ i }}<br></strong>
          </div>
          <div style="float: right;margin: 40px">
            <strong>{{timeConverter(broadcast.time)}}</strong>
          </div>
        </el-card>
      </el-col>

      <el-col :span="9" :offset="1">
        <el-card class="box-card" style="width:100%;height: 400px">
          <div style="text-align: left">
            <el-image :src="require('../assets/fire.svg')"
                      style="height: 30px;width: 30px;vertical-align: middle"></el-image>
            <strong style="vertical-align: middle">
              本周热卖</strong>
          </div>
          <el-divider></el-divider>
          <div style="text-align:center;display: inline-flex">

            <div v-for="book in hotBook" :key="book.id" @click="ck(book)" style="padding: 14px;margin: 5px 30px">
              <img :src="$store.state.url+book.imgurl" class="image">
              <div style="margin-top: 5px">
                <strong>{{book.name}}</strong>
              </div>
            </div>

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      pictures: ["book1.png", "book2.png", "book3.png", "book4.png"],
      broadcast: null,
      hotBook: []
    }
  },

  computed: {
    content() {
      if (this.broadcast == null) return []
      console.log(this.broadcast.details)
      return this.broadcast.details.split("\n")
    },
    title() {
      if (this.broadcast == null) return ''

      return this.broadcast.title
    }
  },
  mounted() {
    axios({
      url: 'notice',
      method: 'get'
    }).then((response) => {
      if (response.data.code === 200)
        this.broadcast = response.data.data;
    })

    axios({
      url:'hotSale/2',
      method:'get'
    }).then((response)=>{
      if (response.data.code === 200) {
        this.hotBook = response.data.data
      }
    })
  },
  methods: {
    ck: function (book) {
      this.$store.commit("PUT_DETAIL",book)
      this.$router.push({name: "BookDetail"})
    },
    timeConverter(time) {
      return time.split("T")[0]
    }
  }
}
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  text-align: left;
  padding: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>