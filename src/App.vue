<template>
  <div id="app">
    <el-container>
      <el-header height="56px">
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer height="55px">
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

  import Header from '@/components/header'
  import Footer from '@/components/footer'
  import Aside from '@/components/aside'
  import Bus from '@/components/bus.js'
  export default {
    name: 'App',
    components: {
      Header,
      Footer,
      Aside
    },
    data: function () {
      return {

      }
    }
  }


</script>
<style>
  .el-header {
    /*background-color: #409EFF;*/
    color: #333;
    /*text-align: center;*/
    /*line-height: 60px;*/

  }

  .el-footer {
    color: #333;
    text-align: center;
    line-height: 50px;
    font-size: 13px;

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 510px;
  }

  .app {
    width: 100%;
    height: 100%;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }
</style>
