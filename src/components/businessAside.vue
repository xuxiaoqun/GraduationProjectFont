<template>
  <div>
    <el-menu text-color="#333" active-text-color="#409EFF" router
             :default-active="active" >
      <el-menu-item index="rules">
        <i class="el-icon-setting"></i>
        <span slot="title" style="font-size: 25px;">商家准则</span>
      </el-menu-item>
      <el-submenu index="hotel">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">我的酒店</span>
        </template>
        <el-menu-item index="releaseHotel">发布酒店信息</el-menu-item>
        <el-menu-item index="hotelInfo">已发布酒店信息</el-menu-item>
      </el-submenu>
      <el-submenu index="product">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">我的房型</span>
        </template>
        <el-menu-item index="releaseProduct">发布房型信息</el-menu-item>
        <el-menu-item index="produceInfo">已发布房型信息</el-menu-item>
      </el-submenu>
      <el-menu-item index="sureOrder"> <i class="el-icon-menu"></i>我的订单</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {

    name: 'Aside',
    props: ['active'],
    data: function () {
      return {}
    },
    created:function(){
      //方便测试，暂时不检测当前用户是否登录
//      if (!this.$store.state.consumer.name) {
//        alert("当前用户还未登录，请登录后再进行此操作");
//        this.$router.push({path: '/login'});
//      }
      this.$store.dispatch('getConsumer');
    }
  }
</script>
<style scoped>
  .el-menu-item {
    text-align: left;
  }

  .el-submenu {
    text-align: left;
  }

</style>
