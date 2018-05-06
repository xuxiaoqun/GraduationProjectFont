<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="rules"></Aside>
      </el-aside>
      <el-main>
        <Rules></Rules>
      </el-main>
    </el-container>

  </div>
</template>
<script>
  import Aside from '@/components/businessAside'
  import Rules from '@/pages/businessRules'
  export default {
    name: 'myInfo',
    data: function(){
      return {

      }
    },
    created:function(){
//      var url = this.Host + '/getConsumer';
//      this.$axios.get(url).then(res => {
//        if(res.data){
//          this.$store.commit("changeConsumer",res.data);
//        }else{
//          this.$message.error('您还没有登录，即将跳到主页!');
//          this.$router.push({name: 'layout'})
//        }
//      });
    },
    components:{
      Aside,
      Rules
    }
  }
</script>
<style scoped>
  .el-aside {
    background-color: white;

    line-height: 200px;
  }
  .el-main{
    height: 470px
  }

</style>
