<template>
  <div style="height: 100%">
    <el-menu text-color="#333" active-text-color="#409EFF" router
             :default-active="active" >
      <el-menu-item index="lx">
        <i class="el-icon-setting"></i>
        <span slot="title" style="font-size: 25px;">我的乐享</span>
      </el-menu-item>
      <el-menu-item index="orders">
        <i class="el-icon-location"></i>
        <span slot="title">我的订单</span>
      </el-menu-item>
      <el-submenu index="evaluation">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的评价</span>
        </template>
        <el-menu-item index="evaluation">
          <i class="el-icon-document"></i>
          <span slot="title">待评价</span>
        </el-menu-item>
        <el-menu-item index="unpaid">
          <i class="el-icon-document"></i>
          <span slot="title">已评价</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="info">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item index="basicInfo">
          <i class="el-icon-document"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>
        <el-menu-item index="creditInfo">
          <i class="el-icon-document"></i>
          <span slot="title">信用信息</span>
        </el-menu-item>
        <el-menu-item index="account">
          <i class="el-icon-document"></i>
          <span slot="title">个人账户</span>
        </el-menu-item>
      </el-submenu>


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
//        this.$message.error('当前用户还未登录，请登录后再进行此操作!');
//        this.$router.push({path: '/login'});
//      }
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
