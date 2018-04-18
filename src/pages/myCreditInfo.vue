<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="creditInfo"></Aside>
      </el-aside>
      <el-main>
        信用信息
      </el-main>
      </el-container>
  </div>
</template>

<script>
  import Aside from '@/components/aside'
  export default {
    name: 'introduce',
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

  .el-main {
    height: 470px
  }
</style>
