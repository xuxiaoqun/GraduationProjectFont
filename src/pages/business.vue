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
