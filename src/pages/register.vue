<template>
  <div style="width: 50%; margin: 0 auto ">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"
               label-width="100px">

        <el-form-item prop="name" label="昵称" >
          <el-input v-model="ruleForm2.name" placeholder="请输入昵称" autofocus clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" >
          <el-input v-model="ruleForm2.email" placeholder="请输入邮箱地址" clearable>
            <template slot="append">
              <el-button @click="send(ruleForm2.email)" :disabled="disabled">{{msg}}</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="identifyingCode">
          <el-input type="text" v-model="ruleForm2.identifyingCode" auto-complete="off"
                    placeholder="请输入邮箱验证码" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"
                    placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="ruleForm2.checkPassword" auto-complete="off"
                    placeholder="请再次输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
  var ordertime = 60;//验证码等待时间
  var timeleft = ordertime;
  export default {
    data: function() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
//        if (this.ruleForm2.checkPass !== '') {
//          this.$refs.ruleForm2.validateField('checkPass');
//        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      }else{
        callback();
      }
    };

    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }else{
        var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
        if(reg.test(value)){
          this.flag = true;
        }else{
          callback(new Error('请输入正确邮箱地址'));
        }
        callback();
      }
    };
      var validateName = (rule, value, callback) => {
        if (value.length > 5) {
          callback(new Error('昵称不能超过五位'));
        }else{
          callback();
        }
      };
    return {
      msg:"发送验证码",
      disabled:false,
      flag:false,
      ruleForm2: {
        password: '',
        checkPassword: '',
        email: '',
        identifyingCode:'',
        name:''
      },
      rules2: {
        password: [
          { validator: validatePass, trigger: 'blur', required: true}
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur', required: true }
        ],
        identifyingCode:[
          { validator: validateCode, trigger: 'blur', required: true }
        ],
        email:[
          { validator: validateEmail,required: true,  trigger: 'blur', type:'email'}
        ],
        name:[
          { validator: validateName,required: true,  trigger: 'blur', type:'email'}
        ]
      }
    };
  },
  methods: {
    submitForm: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = this.Host + '/register';
          this.$axios.post(url,this.ruleForm2).then(res => {
            if(res.data) {
              this.$message.success('注册成功,跳到登录页面！');
              this.$router.push({path: '/login'})
            }else{
              this.$message.error('验证码不对，请重新输入');
            }
          }).catch(function(error){
            console.log(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },
    send: function(formName) {
        if(this.flag){
          var url = this.Host + '/sendEmail';
          this.$axios.post(url,this.ruleForm2).then(res => {
            if(res.data) {
              this.$message.success('发送验证码成功');
              this.disabled = true;
              this.timeCount();
            }else{
              this.$message.error('该邮箱已经注册过，请换个邮箱再注册!');
            }
          }).catch(function(error){
            console.log(error);
          })
        }else{
          this.$message.error('请输入正确的邮箱地址!');
        }
      },
    //计时函数
    timeCount:function (){
      timeleft -= 1;
      if (timeleft>0){
        this.msg = timeleft + "后重新获取";
        setTimeout(this.timeCount,1000)
      }
      else {
        this.msg = "发送验证码";
        timeleft=ordertime   //重置等待时间
        this.disabled = false;
      }
      }
    }
  }
</script>
<style scoped>
  .el-form-item{
    width: 70%;
  }
</style>
