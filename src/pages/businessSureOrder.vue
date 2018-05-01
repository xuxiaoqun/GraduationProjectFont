<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="sureOrder"></Aside>
      </el-aside>
      <el-main style="padding-top: 0">
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
                <el-table-column  align="center" >
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
                    <el-button type="primary" round >点击确认入住</el-button>
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
        isShow:false
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
          }else{
            this.$message.error("获取订单信息失败！");
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      orderResponse:function(row,value) {
        console.log(row);
        console.log(value);

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

