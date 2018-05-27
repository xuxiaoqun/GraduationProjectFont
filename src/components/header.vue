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
        <el-col :span="1.5" :offset="13">
          <el-menu-item v-if="flag" index="/login">登录</el-menu-item>
        </el-col>
        <el-col :span="1.5">
          <el-menu-item v-if="flag" index="/register">注册</el-menu-item>
        </el-col>
        <el-col :span="2.5"  v-if="!flag" :offset="15">
          <el-menu-item @click="logout" index="#">注销</el-menu-item>
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
    methods:{
      logout:function(){
        var url = this.Host + '/logout';
        this.$axios.get(url).then(res => {
          if(res.data){
            window.localStorage.removeItem("consumer");
            var consumer = { name:null, id:null };
            this.$store.commit("changeConsumer",consumer);
            this.$message.success('注销成功，即将跳到主页!');
            this.$router.push({path: '/'})
            this.flag = true;
          }else{
            this.$message.error('注销失败,请确认后重新输入!');
          }
        });
      }
    },
    created:function(){

    },
    computed: {
      name: function () {
        if(this.$store.state.consumer.name){
          this.flag = false;
          return this.$store.state.consumer.name;
        }else if(window.localStorage.getItem("consumer")){
          var obj = window.localStorage.getItem("consumer");
          var json = JSON.parse(obj);
          this.flag = false;
          return json.name;
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
