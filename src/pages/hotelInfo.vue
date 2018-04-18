<template>
  <div >
    <h1>{{hotelProInfo.hotel_name}}({{hotelProInfo.hotel_address}})</h1>
      <!--<div id="image">-->
        <!--<img :src="url + hotelProInfo.hotel_picture" width="600px" height="300px">-->
      <!--</div>-->
    <div style="width:600px" id="image">
      <el-carousel indicator-position="outside" height="300px">
        <el-carousel-item v-for="item in hotelProInfo.hotel_picture" :key="item">
          <img :src="url+item" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
      <div id="text">
        <p>评分：{{hotelProInfo.hotel_grade}}</p><br><br>
        <hr><br><br>
        <p>{{hotelProInfo.hotel_opemTime}}年开业</p><br><br>
        <p>电话：{{hotelProInfo.hotel_phone}}</p><br><br>
        <p>{{hotelProInfo.hotel_fag}}</p>
      </div>
      <div id="message">
        <el-tabs value="first" >
          <el-tab-pane label="房型预订" name="first">

          </el-tab-pane>
          <el-tab-pane label="交通位置" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="酒店信息" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="用户点评" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'hotelInfo',
    data: function(){
      return {
        url:this.Host + '/',
        hotelProInfo:{}
      }
    },
    created:function(){
      var url = this.Host + '/getHotelProInfoById';
      this.$axios.post(url,this.$route.query).then(res => {
        if(res.data){
          this.hotelProInfo = res.data;
          console.log(res.data);
        }else{
          this.$message.error("该酒店今天没开业！");
          this.$router.push({path: '/'});
        }
      })
    }
  }
</script>
<style scoped>
  #image {float: left; height: 300px; background-color: white}
  #text { float: left; width: 40%;height: 300px;text-align: left;background-color: white}
  #message{
    width: 100%;
    height: 500px;
    text-align: center;
    clear: both;
  }
</style>
