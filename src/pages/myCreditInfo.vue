<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="creditInfo"></Aside>
      </el-aside>
      <el-main>
          <div style="width: 40%; position: relative;
              top: 35%;
              transform: translateY(-50%);"
              >
            <el-form :model="credit" status-icon ref="credit"
                     label-width="100px"  :rules="rules"
                    >

              <el-form-item prop="phone" label="手机：" >
                <el-input v-model="credit.phone" placeholder="请输入手机号"
                          autofocus clearable :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="身份证：" prop="idCard">
                <el-input v-model="credit.idCard" placeholder="请输入身份证号"
                          clearable :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="银行卡：" prop="bankCard">
                <el-input v-model="credit.bankCard"  placeholder="请输入银行卡号"
                          clearable :readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="信用指数：" prop="creditIndex" v-if="credit.creditIndex">
                <div  @mouseenter="tips">
                  <el-input v-model="credit.creditIndex"
                            :readonly="readonlyAll"></el-input>
                </div>

              </el-form-item>
              <el-form-item style="text-align: center">
                <div v-if="credit.creditIndex">
                  <el-button type="primary" @click="change">{{modify}}</el-button>
                  <el-button @click="resetForm('credit')">重置</el-button>
                </div>
                <div v-else>
                  <el-button type="primary" @click="submitForm('credit')">提交</el-button>
                  <el-button @click="resetForm('credit')">重置</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        <div>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span><span style="color: red">当信用指数>=60时</span>，预订酒店时可以先付一半金额，待入住完成再付另一半即可;</span><br><br>
            <span><span style="color: red">当信用指数>=70时</span>，即可享受先入住后付款。</span><br><br>
            <span>信用指数会随着您良好的记录而积累。</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="noTips">本次不再提示</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
    name: 'credit',
    data: function(){
      return {
        credit:{
          consumer_id:'',
          phone:'',
          idCard:'',
          bankCard:'',
          creditIndex:0
        },
        readonly:false,
        readonlyAll:true,
        modify:'修改',
        loading:true,
        dialogVisible:false,
        dialogVisibleAgain:'Y',
        rules:{
          phone:[
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          idCard:[
            {required: true, message: '请输入身份证号', trigger: 'blur'}
          ],
          bankCard:[
            {required: true, message: '请输入银行卡号', trigger: 'blur'}
          ]

        }
      }
    },
    methods:{
      getCredit:function(){
        var url = this.Host + '/getCredit';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          if(res.data.is_credit == 'N'){
            this.$confirm('当前用户尚未开通信用信息，是否开通?', '提示', {
              type: 'warning'
            }).then(() => {
              this.$message.info("请完成以下信息的填写！");
              this.loading = false;
            }).catch(() => {
              window.history.back(-1);
            });
          }else{
            this.loading = false;
            this.credit = res.data.credit;
            console.log(this.credit);
            this.readonly = true;
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      },
      submit:function(){
        this.credit.consumer_id = this.$store.state.consumer.id;
        var url = this.Host + '/saveCredit';
        this.$axios.post(url,this.credit).then(res => {
          if(res.data){
            this.$message.success('信用信息提交成功！');
            this.getCredit();
          }else{
            this.$message.error('信用信息提交失败，请稍后再试！');
          }
        });
      },
      update:function(){
        this.credit.consumer_id = this.$store.state.consumer.id;
        var url = this.Host + '/updateCredit';
        this.$axios.post(url,this.credit).then(res => {
          if(res.data){
            this.$message.success('信用信息修改成功！');
            this.getCredit();
          }else{
            this.$message.error('信用信息修改失败，请稍后再试！');
          }
        });
      },
      submitForm:function(formName){
        this.$refs[formName].validate((valid) =>{
          if (valid) {
            this.submit();
          }
        })
      },
      change:function(){
        if(this.modify == '提交修改'){
          this.modify = '修改';
          this.update();
          this.readonly = true;
        }else{
          this.readonly = false;
          this.modify = '提交修改';
        }
      },
      tips:function(){
        if(this.dialogVisibleAgain == 'Y'){
          this.dialogVisible = true;
        }
      },
      noTips:function(){
        this.dialogVisible = false;
        this.dialogVisibleAgain = 'N';
      }
    },
    created:function(){
      this.getCredit();
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
