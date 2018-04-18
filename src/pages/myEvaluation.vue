<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="evaluation"></Aside>
      </el-aside>
      <el-main>
        我的评价
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Aside from '@/components/aside'
  export default {
    name: 'evaluation',
    data: function(){
      return {

      }
    },
    components: {
      Aside
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
