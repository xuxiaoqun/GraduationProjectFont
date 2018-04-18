<template>
  <div>
    <el-menu mode="horizontal"
             active-text-color="#409EFF" router>
      <el-row>
        <el-col :span="2">
          <el-menu-item index="/intro" style="font-size: large;text-align: center">乐享生活</el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item index="/">主页</el-menu-item>
        </el-col>
        <el-col :span="2.5">
          <el-menu-item index="/mine/lx">
            <template slot="title" v-if="flag">我的乐享</template>
            <template slot="title" v-show="!flag">{{name}}</template>
          </el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item index="/business/rules">
            <template slot="title">商家中心</template>
          </el-menu-item>
        </el-col>
        <el-col :span="1.5" :offset="12">
          <el-menu-item v-if="flag" index="/login">登录</el-menu-item>
        </el-col>
        <el-col :span="1.5">
          <el-menu-item v-if="flag" index="/register">注册</el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default ({
    name: 'Header',
    data: function () {
      return {
        flag: true,

      }
    },
    computed: {
      name: function () {
        if (this.$store.state.consumer.name) {
          this.flag = false;
          return this.$store.state.consumer.name;
        }
      }
    }
  })
</script>
<style scoped>
  .el-col {
    text-align: center;
  }
</style>
