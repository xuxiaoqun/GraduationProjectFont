<template>
  <div style="width: 50%; margin: 0 auto;position: relative;
      top: 40%;
      transform: translateY(-50%);">
    <el-form :model="ruleForm2" status-icon ref="ruleForm2"
             label-width="100px"  >

      <el-form-item prop="email" label="邮箱" >
        <el-input v-model="ruleForm2.email" placeholder="请输入邮箱地址"
                  autofocus clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"
                  placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'Login',
    data: function() {
      return {
        ruleForm2: {
          password: '',
          email: ''
        }
      }
    },
    methods: {
      submitForm: function(formName) {
        var url = this.Host + '/login';
        this.$axios.post(url,this.ruleForm2).then(res => {
         if(res.data) {
           console.log(res.data);
           this.$message.success('登录成功，即将返回上一步!');
           this.$store.commit("changeConsumer",res.data);
           window.history.back(-1);

         }else{
           this.$message.error('邮箱或密码不正确,请确认后重新输入!');
         }
        }).catch(function(error){
          console.log(error);
        })
      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .el-form-item{
    width: 70%;
  }
</style>
