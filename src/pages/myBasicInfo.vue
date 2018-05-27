<template>
  <div>

    <el-container>
      <el-aside width="200px">
        <Aside active="basicInfo"></Aside>
      </el-aside>
      <el-main>
        <div style="width: 40%; position: relative;
      top: 30%;
      transform: translateY(-50%);">
          <el-form :model="form1" ref="form1" label-width="90px">
            <el-form-item  label="昵称：">
              <el-input v-model="form1.name" readonly>
                <template slot="append">
                  <el-button @click="change(0)" icon="el-icon-edit"  circle></el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item  label="绑定邮箱：">
              <el-input v-model="form1.email" readonly>
                <template slot="append">
                  <el-button @click="change(1)" icon="el-icon-edit"  circle></el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item  label="登录密码：">
              <el-input v-model="form1.password" type="password" readonly>
                <template slot="append">
                  <el-button @click="change(2)" icon="el-icon-edit"  circle></el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="commit">提交修改</el-button>
            </el-form-item>

          </el-form>
        </div>
        <div>
          <el-dialog title="修改昵称" :visible.sync="dialogVisibleName" width="30%">
            <div style="text-align: left">
              <span>当前昵称:</span>
              &nbsp;&nbsp;&nbsp;
              <span>{{form1.name}}</span>
            </div>
            <div style="width: 70%; position: relative;top: 30%;transform: translateY(30%);">
              <el-form ref="form2" :model="form2" label-width="80px"
                       label-position="left" size="small ">
                <el-form-item  label=" 修改昵称:">
                  <el-input v-model="form2.name" ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleName = false">取 消</el-button>
              <el-button type="primary" @click="changeMsg('name',form2.name)">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <el-dialog title="修改密码" :visible.sync="dialogVisiblePS" width="30%">
            <div style="text-align: left">
              <span>当前密码:</span>
              &nbsp;&nbsp;&nbsp;
              <span>{{form1.password}}</span>
            </div>
            <div style="width: 70%; position: relative;top: 30%;transform: translateY(30%);">
              <el-form ref="form2" :model="form2" label-width="80px"
                       label-position="left" size="small ">
                <el-form-item  label=" 修改密码:">
                  <el-input v-model="form2.password" ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisiblePS = false">取 消</el-button>
              <el-button type="primary" @click="changeMsg('password',form2.password)">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Aside from '@/components/aside'
  export default {
    name: 'myInfo',
    data: function () {
      return {
        form1: {
          name: '',
          email: '',
          password: ''
        },
        form2:{
          name: '',
          email: '',
          password: ''
        },
        dialogVisibleName:false,
        dialogVisiblePS:false
      }
    },
    components: {
      Aside
    },
    methods:{
      change:function(value){
        if(value === 0){
          this.dialogVisibleName = true;
        }else if(value === 2){
          this.dialogVisiblePS = true;
        }else{
          alert("当前邮箱暂不支持修改");
        }
      },
      changeMsg:function(k,v){
        var field = {key:k,value:v}
        this.$store.commit("changeConsumerFild",field);
        if(k === 'name'){
          this.dialogVisibleName = false;
        }
        if(k === 'password'){
          this.dialogVisiblePS = false;
        }
        if (this.$store.state.consumer.name) {
          this.form1= this.$store.state.consumer;
        }
      },
      commit:function(){
        this.$store.dispatch("changeConsumer",this.form1);
      }
    },
    created: function () {

        this.form1=  JSON.parse(window.localStorage.getItem("consumer"));

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
