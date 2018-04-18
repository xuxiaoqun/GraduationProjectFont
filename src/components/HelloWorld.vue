<template>
  <div class="hello">
    <!--keep-alive>
      <component v-bind:is="currentView" ></component>
    </keep-alive>
    <button @click="changeView">更换视图</button>-->
    <button @click="ajax">获取后台数据</button>
    <el-table :data="info" style="width: 50%;text-align: left" height="300" border>
      <el-table-column prop="userName" label="用户名" width="100"></el-table-column>
      <el-table-column prop="passWord" label="密码" width="100"></el-table-column>
      <el-table-column prop="phono" label="手机号" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  var home = {
    template: '<p>Welcome home!</p>'
  }

  var sun = {
    template: '<p>Welcome sun!</p>'
  }
  export default {
    name: 'HelloWorld',
    data: function () {
      return {
        msg: 'Welcome to Your Vue.js App',
        hello: 'dajiazishizz',
        currentView: 'sun',
        info:[]
      }
    },
    methods: {
      changeView: function () {
        if (this.currentView == 'sun') {
          this.currentView = 'home'
        } else {
          this.currentView = 'sun'
        }

        console.log(this.currentView);
      },
      ajax:function(){
        var url = this.Host + '/user';
        this.$axios(url)
          .then(res => {
          this.info = res.data;
        })
        .catch(function(error){
          console.log(error);
        })
      }
    },
    components: {
      home: home,
      sun: sun
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
