<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="account"></Aside>
      </el-aside>
      <el-main>

        <div style="width: 40%; position: relative;
              top: 0%;
              transform: translateX(-4%);">
          <el-form :model="account" status-icon ref="account" label-width="100px" >
            <el-form-item prop="phone" label="账户余额：" >
              <el-input v-model="account.balance" readonly>
                <template slot="append">
                  <el-button @click="recharge" icon="el-icon-edit"  circle>充值</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tabs value="recharge"  type="border-card">
            <el-tab-pane label="充值记录" name="recharge">
              <el-table :data="rechargeBill" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column
                  type="index"
                  width="75">
                </el-table-column>
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <p>{{scope.row.recharge}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="消费记录" name="consume">

              <el-table :data="consumeBill" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column
                  type="index"
                  width="75">
                </el-table-column>
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <p>{{scope.row.consume}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
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
          rechargeAmount:0
        },
        account:{},
        rechargeBill:[],
        consumeBill:[],
        dialogVisible:false,
        isShow:false
      }
    },
    methods:{
      recharge:function(){
        this.dialogVisible = true;
      },
      sureRecharge:function(){
        if(parseInt(this.form.rechargeAmount) <= 0){
          this.$message.error('充值金额必须大于0！');
          return;
        }
        var url = this.Host + '/updateAccount';
        this.account.balance = parseInt(this.account.balance) + parseInt(this.form.rechargeAmount);
        this.account.change = this.form.rechargeAmount;
        this.$axios.post(url,this.account).then(res => {
          if(res.data){
            this.$message.success('成功充值金额' + this.form.rechargeAmount);
            this.getAccount();
          }else{
            this.$message.error('充值失败，请稍后再试！');
          }
        })
        this.dialogVisible = false;
      },
      getAccount:function(){
        var url = this.Host + '/getAccount';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          if(res.data){
            this.account = res.data.account;
            this.consumeBill = res.data.consumeBill;
            this.rechargeBill = res.data.rechargeBill;
            console.log(res.data);
          }else{
            this.$message.error('账户信息获取失败，请稍后再试！');
          }
        })
      },
    },
    created:function(){
      this.getAccount();
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
