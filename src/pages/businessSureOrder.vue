<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="sureOrder"></Aside>
      </el-aside>
      <el-main style="padding-top: 0;padding-left: 10px">
        <!--<div>-->
          <!--<el-form :inline="true" :model="formSearch">-->
            <!--<el-form-item label="酒店名称">-->
              <!--<el-input v-model="formSearch.name"></el-input>-->
              <!--&lt;!&ndash;<el-select v-model="value" placeholder="请选择">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-option&ndash;&gt;-->
                  <!--&lt;!&ndash;v-for="item in options"&ndash;&gt;-->
                  <!--&lt;!&ndash;:key="item.value"&ndash;&gt;-->
                  <!--&lt;!&ndash;:label="item.label"&ndash;&gt;-->
                  <!--&lt;!&ndash;:value="item.value">&ndash;&gt;-->
                <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<el-date-picker v-model="formSearch.date" type="daterange"-->
                              <!--range-separator="至"-->
                              <!--start-placeholder="入住日期"-->
                              <!--end-placeholder="离店日期"-->
                              <!--:picker-options="pickerOptions1"-->
                              <!--format="yyyy-MM-dd"-->
                              <!--value-format="yyyy-MM-dd">-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<el-button type="primary"  round icon="el-icon-search" @click="search">查询剩余房间数</el-button>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</div>-->
        <div >
          <el-tabs type="border-card">
            <el-tab-pane label="待确认订单">
              <el-table :data="noConfirmOrders" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}</h3>
                      <p>{{scope.row.produce_amount}}间；{{scope.row.houseType}}; 使用时间：</p>
                      <p>{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div style="padding-bottom: 0">
                      <p>&nbsp;</p>
                      <p>入住人姓名：{{scope.row.occupant_name}}</p>
                      <p>联系方式：{{scope.row.occupant_email }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div >
                      <p>订单总额：{{scope.row.order_total | priceFilter}} </p>
                      <p>实际支付：{{scope.row.payAmount | priceFilter}}</p>
                      <p>付款方式：
                        <span v-if="scope.row.payType == 'balance'">余额支付</span>
                        <span v-else>信用支付；</span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  align="center">
                  <template slot-scope="scope" >
                    <el-button type="primary" round @click="orderResponse(scope.row,'确认')">确认</el-button>
                    <el-button type="primary" round @click="orderResponse(scope.row,'拒绝')">取消</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已确认订单">
              <el-table :data="confirmOrders" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}</h3>
                      <p>{{scope.row.produce_amount}}间；{{scope.row.houseType}}; 使用时间：</p>
                      <p>{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div style="padding-bottom: 0">
                      <p>&nbsp;</p>
                      <p>入住人姓名：{{scope.row.occupant_name}}</p>
                      <p>联系方式：{{scope.row.occupant_email }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div >
                      <p>订单总额：{{scope.row.order_total | priceFilter}} </p>
                      <p>实际支付：{{scope.row.payAmount | priceFilter}}</p>
                      <p>付款方式：
                        <span v-if="scope.row.payType == 'balance'">余额支付</span>
                        <span v-else>信用支付；</span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope" >
                    <div v-if="scope.row.order_status == '待入住'">
                      <el-button type="primary" round @click="checkIn(scope.row)">点击确认入住</el-button>
                    </div>
                    <div v-if="scope.row.order_status == '已消费'">
                      <el-button type="success" round>已入住</el-button>
                    </div>
                    <div v-if="scope.row.order_status == '已评价'">
                      <el-button type="success" round>已入住</el-button>
                    </div>
                    <div v-if="scope.row.order_status == '已退款'">
                      <el-button type="success" round>已退款</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已取消订单">
              <el-table :data="refuseOrders" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}</h3>
                      <p>{{scope.row.produce_amount}}间；{{scope.row.houseType}}; 使用时间：</p>
                      <p>{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div style="padding-bottom: 0">
                      <p>&nbsp;</p>
                      <p>入住人姓名：{{scope.row.occupant_name}}</p>
                      <p>联系方式：{{scope.row.occupant_email }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div >
                      <p>订单总额：{{scope.row.order_total | priceFilter}} </p>
                      <p>实际支付：{{scope.row.payAmount | priceFilter}}</p>
                      <p>付款方式：
                        <span v-if="scope.row.payType == 'balance'">余额支付</span>
                        <span v-else>信用支付；</span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope" >
                    <el-button type="info" round>已取消</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="今日入住">
              <el-table :data="todayOrders" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow">
                <el-table-column align="left">
                  <template slot-scope="scope">
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}</h3>
                      <p>{{scope.row.produce_amount}}间；{{scope.row.houseType}}; 使用时间：</p>
                      <p>{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div style="padding-bottom: 0">
                      <p>&nbsp;</p>
                      <p>入住人姓名：{{scope.row.occupant_name}}</p>
                      <p>联系方式：{{scope.row.occupant_email }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column   align="left" >
                  <template slot-scope="scope" >
                    <div >
                      <p>订单总额：{{scope.row.order_total | priceFilter}} </p>
                      <p>实际支付：{{scope.row.payAmount | priceFilter}}</p>
                      <p>付款方式：
                        <span v-if="scope.row.payType == 'balance'">余额支付</span>
                        <span v-else>信用支付；</span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope" >
                    <div v-if="scope.row.order_status == '待入住'">
                      <el-button type="primary" round @click="checkIn(scope.row)">点击确认入住</el-button>
                    </div>
                    <div v-else="scope.row.order_status == '已消费'">
                      <el-button type="success" round @click="checkIn(scope.row)">已入住</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Aside from '@/components/businessAside'
  export default {
    name: 'introduce',
    data: function(){
      return {
        confirmOrders:[],
        noConfirmOrders:[],
        refuseOrders:[],
        todayOrders:[],
        isShow:false,
//        formSearch:{
//          name:'',
//          house_type:'',
//          date:[]
//        },
        pickerOptions1:{
          disabledDate:function(time){
            return time.getTime() < (Date.now()-3600*24*1000);
          }
        },
      }
    },
    methods:{
      getPayment:function(){
        var url = this.Host + '/getPayment';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          if(res.data){
            this.confirmOrders = res.data.confirmOrders;
            this.noConfirmOrders = res.data.noConfirmOrders;
            this.refuseOrders = res.data.refuseOrders;
            this.todayOrders = res.data.todayOrders;
            console.log(res.data);
          }else{
            this.$message.error("获取订单信息失败！");
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      orderResponse:function(row,value) {
        var url = this.Host + '/sureOrder';
        row.order_status = value;
        //status状态 1：拒绝成功 ，2：房间数不够，自动拒绝订单 ，3：确认成功
        this.$axios.post(url,row).then(res => {
          if(res.data){
            if(res.data.status == '1'){
              this.$message.success("订单已拒绝！");
            }else if(res.data.status == '2'){
              this.$message.error("房间数不够，自动拒绝订单！");
            }else if(res.data.status == '3'){
              this.$message.success("订单确认成功！");
            }
            this.getPayment();
          }else{
            this.$message.error("操作失败，请稍后再试！");
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      checkIn:function(row){
        var url = this.Host + '/checkIn';
        this.$axios.post(url,row).then(res => {
          if(res.data){
            this.$message.success("入住成功！");
            this.getPayment();
          }else{
            this.$message.error("入住失败，请稍后再试！");
          }
        }).catch(function(error){
          console.log(error);
        })
      }
    },
    filters: {
      priceFilter:function(value){
        if(value){
          return '￥' + value ;
        }
      }
    },
    created:function(){
      this.getPayment();
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
</style>
<style>
  .qqq .el-dialog__body{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
