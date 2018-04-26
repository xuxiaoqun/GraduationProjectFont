<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="account"></Aside>
      </el-aside>
      <el-main>

        <div style="width: 40%; position: relative;
              top: 35%;
              transform: translateY(-50%);">
          <el-form :model="form" status-icon ref="form" label-width="100px">
            <el-form-item prop="phone" label="账户余额：" >
              <el-input v-model="form.account" readonly>
                <template slot="append">
                  <el-button @click="recharge" icon="el-icon-edit"  circle>充值</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-dialog title="账户充值" :visible.sync="dialogVisible" width="30%">
            <div style="text-align: left">
              <span>当前余额:</span>
              &nbsp;&nbsp;&nbsp;
              <span>{{form.balance}}</span>
            </div>
            <div style="width: 70%; position: relative;top: 30%;transform: translateY(30%);">
              <el-form ref="form" :model="form" label-width="80px"
                       label-position="left" size="small ">
                <el-form-item  label=" 充值金额:">
                  <el-input v-model="form.rechargeAmount" ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureRecharge">确 定</el-button>
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
    name: 'introduce',
    data: function(){
      return {
        form:{
          balance:'0',
          rechargeAmount:''
        },
        dialogVisible:false
      }
    },
    methods:{
      recharge:function(){
        this.dialogVisible = true;
      },
      sureRecharge:function(){
        var url = this.Host + '/saveAccount';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          if(res.data){
            this.$message.success('信用信息提交成功！');
            this.getCredit();
          }else{
            this.$message.error('信用信息提交失败，请稍后再试！');
          }
        });
      },
      getAccount:function(){
        var url = this.Host + '/getAccount';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          if(res.data){
            this.$message.success('信用信息提交成功！');
            this.getCredit();
          }else{
            this.$message.error('信用信息提交失败，请稍后再试！');
          }
        });
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
