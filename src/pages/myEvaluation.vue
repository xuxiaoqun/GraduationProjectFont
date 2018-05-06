<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="evaluation"></Aside>
      </el-aside>
      <el-main style="padding-top: 0;padding-left: 10px">
        <div >
          <el-tabs type="border-card">
            <el-tab-pane label="待评价">

              <el-table :data="noEvaluation" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}({{scope.row.houseType}})</h3>
                      <p>下单时间：{{scope.row.order_time}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope" >
                    <el-button type="primary" round @click="goEvaluation(scope.row)">去评价</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane label="已评价">
              <el-table :data="evaluation" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}({{scope.row.houseType}})</h3>
                      <p>下单时间：{{scope.row.order_time}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope" >
                    <el-button type="primary" round @click="lookEvaluation(scope.row)">查看评价</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <el-dialog
            :title="order.name + '(' +  order.houseType + ')'"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
              <span style="float: left">评分：</span>
              <el-rate v-model="form.grade" show-text style="float: left " :disabled="disabled">
              </el-rate>
            </div>
            <div style="padding-top: 10px;clear: both" >
              <el-form ref="form" :model="form">
                <el-form-item :style="{display: display}">
                  <el-checkbox-group v-model="form.flag" style="text-align: left" @change="addFlag">
                    <el-checkbox label="房间干净" name="flag"></el-checkbox>
                    <el-checkbox label="价格划算" name="flag"></el-checkbox>
                    <el-checkbox label="服务赞" name="flag" ></el-checkbox>
                    <el-checkbox label="位置好" name="flag" ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                  <el-input type="textarea" v-model="form.msg" :disabled="disabled"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <div v-if="!disabled">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEvaluation">确 定</el-button>
              </div>
               <div v-else>
                 <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
               </div>
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
    name: 'evaluation',
    data: function(){
      return {
        disabled:false,
        display:'block',
        isShow:false,
        noEvaluation:[],
        evaluation:[],
        dialogVisible:false,
        order:{},
        value:null,
        form:{
          grade:null,
          flag:[],
          msg:'',
          order_id:null,
          hotel_id:null
        }
      }
    },
    methods:{
      getUsedOrder:function(){
        var url = this.Host + '/getUsedOrder';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          if(res.data){
            this.evaluation = res.data.evaluation;
            this.noEvaluation = res.data.noEvaluation;
            console.log(res.data);
          }else{
            this.$message.error("获取评价信息失败！");
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      goEvaluation:function(row){
        this.form.hotel_id = row.hotel_id;
        this.form.order_id = row.order_id;
        this.form.msg = '';
        this.form.grade = null;
        this.form.flag = [];
        this.order = row;
        this.display = 'block';
        this.disabled = false;
        this.dialogVisible = true;
      },
      lookEvaluation:function(row){
        this.order = row;
        this.form.msg = row.msg;
        this.form.grade = row.grade;
        this.display = 'none';
        this.disabled = true;
        this.dialogVisible = true;
      },
      submitEvaluation:function(){
        var url = this.Host + '/saveEvaluation';
        this.$axios.post(url,this.form).then(res => {
          if(res.data){
            this.$message.success("评价完成！");
            this.getUsedOrder();
          }else{
            this.$message.error("此次评价失败，请稍后再试！");
          }
          this.dialogVisible = false;
        }).catch(function(error){
          console.log(error);
        })
      },
      addFlag:function(){
        this.form.msg = '';
        for(var i = 0; i < this.form.flag.length; i++){
          this.form.msg = this.form.msg + '#' + this.form.flag[i];
        }
        console.log(this.form.msg);
      }
    },
    created:function(){
      this.getUsedOrder();
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
  .el-checkbox{
    margin-left: 10px;
  }
  .el-checkbox:first-child{
    margin-left: 0px;
  }
</style>
