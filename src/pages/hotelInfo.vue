<template>
  <div >
    <h1>{{hotelProInfo.brand}}({{hotelProInfo.address}})</h1>
      <div id="image">
        <img :src="hotelProInfo.image" width="700px" height="300px">
      </div>
      <div id="text">
        <p>评分：{{hotelProInfo.grade}}</p><br><br>
        <hr><br><br>
        <p>{{hotelProInfo.openYear}}年开业</p><br><br>
        <p>电话：{{hotelProInfo.phone}}</p><br><br>
        <p>{{hotelProInfo.special}}</p>
      </div>
      <div id="message">
        <el-tabs value="first" >
          <el-tab-pane label="房型预订" name="first">
            {{hotelProInfo.produce}}
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
        hotelProInfo:{}
      }
    },
    created:function(){
      var url = this.Host + '/getHotelProInfoById';
      this.$axios.post(url,this.$route.query).then(res => {
        console.log(res.data);
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
