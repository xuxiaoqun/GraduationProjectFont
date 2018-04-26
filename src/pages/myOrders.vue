<template>
  <div class="qqq">
    <el-container>
      <el-aside width="200px">
        <div style="height: 470px">
          <Aside active="orders"></Aside>
        </div>

      </el-aside>
      <el-main >
        <div style="width:100%;height: 100%;background-color: white;">
          <el-tabs value="unpaid"  type="border-card">
            <el-tab-pane label="全部订单" name="allOrder">
              <el-table :data="orderList" style="width: 100%;"
                       highlight-current-row
                        :show-header="isShow">
                <el-table-column align="left">
                  <template slot-scope="scope" v-if="scope.row.name">
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}({{scope.row.address}})</h3>
                      <p>{{scope.row.produce_amount}}间,{{scope.row.houseType}}</p>
                      <p>使用时间：{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  prop="min_price" label="价格/元" align="center" sortable>
                  <template slot-scope="scope">
                    <p>总价：{{scope.row.order_total | priceFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope">
                    <div v-if="scope.row.is_payment == 'N'">
                      <el-button type="warning" round @click="checkOrder(scope.row)">待付款</el-button>
                    </div>
                    <div v-if="scope.row.is_payment == 'Y'">
                      <el-button type="primary" round @click="checkOrder(scope.row)">已付款</el-button>
                    </div>
                    <div v-if="scope.row.is_payment == '支付超时'">
                      <el-button type="info" round @click="checkOrder(scope.row)">支付超时</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="待付款" name="unpaid">
              <el-table :data="unpaid" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}({{scope.row.address}})</h3>
                      <p>{{scope.row.produce_amount}}间,{{scope.row.houseType}}</p>
                      <p>使用时间：{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  prop="min_price" label="价格/元" align="center" sortable>
                  <template slot-scope="scope" >
                    <p>总价：{{scope.row.order_total | priceFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope" >
                    <el-button type="warning" round @click="checkOrder(scope.row)">待付款</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="待使用" name="unUsed">

              <el-table :data="unUsed" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" >
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}({{scope.row.address}})</h3>
                      <p>{{scope.row.produce_amount}}间,{{scope.row.houseType}}</p>
                      <p>使用时间：{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  prop="min_price" label="价格/元" align="center" sortable>
                  <template slot-scope="scope" >
                    <p>总价：{{scope.row.order_total | priceFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope" >
                    <el-button type="primary" round @click="checkOrder(scope.row)">待使用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="退款/售后" name="refund/after_sales">
              <el-badge :value="12" class="item"></el-badge>
            </el-tab-pane>


          </el-tabs>

          <el-dialog
            class="my-el-dialog"
            title="订单详情" :visible.sync="dialogVisible" width="45%" center>
            <div style="text-align: left;padding-top: 0">
              <div style="font-size: 17px;margin-bottom: 10px">订单信息</div>
              <div >
                <span >订单总价</span>
                <span style="color: red">
                  ￥ <span style="font-size: 17px">{{orderInfo.order_total}}</span>
                </span>
              </div>
              <div>
                <span >&nbsp;&nbsp;&nbsp;订单号&nbsp;</span>
                <span style="">{{orderInfo.order_id}}</span>
              </div>
              <div>
                <span >下单时间</span>
                <span style="">{{orderInfo.order_time}}</span>
              </div>
            </div>
            <br>
            <hr>
            <br>
            <div style="text-align: left;padding-top: 0">
              <div style="font-size: 17px;margin-bottom: 10px">酒店信息</div>
              <div >
                <span>{{orderInfo.name}}({{orderInfo.address}})</span>
              </div>
              <div>
                <span >酒店电话:</span>
                <span >{{orderInfo.phone}}</span>
              </div>
            </div>
            <br>
            <hr>
            <br>
            <div style="text-align: left;padding-top: 0">
              <div style="font-size: 17px;margin-bottom: 10px">
                {{orderInfo.houseType}}
              </div>
              <div >
                <span>入住：</span>
                <span>{{orderInfo.arrivalDate}} |</span>
                <span>离店：</span>
                <span>{{orderInfo.leaveDate}} |</span>
                <span>共 {{orderInfo.produce_amount}} 间</span>
              </div>
              <div>
                <span >床型:</span>
                <span >{{orderInfo.bedType}}</span>
              </div>
            </div>
            <br>
            <hr>
            <br>
            <div style="text-align: left;padding-top: 0">
              <div style="font-size: 17px;margin-bottom: 10px">预订信息</div>
              <div >
                <span>入住人：</span>
                <span>{{orderInfo.occupant_name}} </span>

              </div>
              <div>
                <span >联系方式:</span>
                <span >{{orderInfo.occupant_email}}</span>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <div v-if="orderInfo.is_payment == 'N'">
                <el-button type="warning" @click="goPayment">去付款</el-button>
              </div>
              <div v-if="orderInfo.is_payment == '支付超时'">
                <el-button type="info" >订单已失效</el-button>
              </div>
              <div v-if="orderInfo.is_payment == 'Y'">
                <el-button type="primary" >订单已完成</el-button>
              </div>
            </span>
          </el-dialog>
          <el-dialog
            title="支付"
            :visible.sync="payDialogVisible"
            width="30%">
            <span>选择支付方式：</span>
            <el-radio v-model="payType" label="credit">信用支付</el-radio>
            <el-radio v-model="payType" label="balance">余额支付</el-radio>
            <span slot="footer" class="dialog-footer">
              <el-button @click="payDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="pay">确 定</el-button>
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
    name: 'orders',
    data: function(){
      return {
        orderList:[],
        unpaid:[],
        unUsed:[],
        orderInfo:{},
        isShow:false,
        dialogVisible:false,
        payDialogVisible:false,
        payType:'credit'
      }
    },
    methods:{
      getOrder:function(){
        var url = this.Host + '/getOrder';
        this.$axios.get(url).then(res => {
          if(res.data){
            this.orderList = res.data.orderList;
            this.unpaid = res.data.unpaid;
            this.unUsed = res.data.unUsed;
            console.log(res.data);
          }else{
            this.$message.error("获取订单信息失败！");
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      checkOrder:function(row){
        this.orderInfo = row;
        this.dialogVisible = true;
      },
      goPayment:function(){
        this.payDialogVisible = true;
      },
      pay:function(){
        console.log(this.payType);
        if(this.payType == 'credit'){
        }
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
      this.getOrder();
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
    padding-top: 0;
    padding-left: 10px;
    padding-right: 10px;
    height: 100%;
    width: 100%;
  }
</style>

<style>
  .qqq .el-dialog__body{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
