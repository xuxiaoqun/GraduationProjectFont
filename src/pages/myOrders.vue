<template>
  <div>
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
              <el-table :data="order" style="width: 100%;"
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
                    <el-button type="warning" round @click="checkOrder(scope.row)">
                      <span v-if="scope.row.is_payment == 'N'">待付款</span>
                      <span v-if="scope.row.is_payment == 'Y'">已付款</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="待付款" name="unpaid">
              <el-table :data="order" style="width: 100%;"
                        highlight-current-row
                        :show-header="isShow" >
                <el-table-column align="left">
                  <template slot-scope="scope" v-if="scope.row.is_payment =='N'">
                    <div style="margin-left: 15px">
                      <h3>{{scope.row.name}}({{scope.row.address}})</h3>
                      <p>{{scope.row.produce_amount}}间,{{scope.row.houseType}}</p>
                      <p>使用时间：{{scope.row.arrivalDate}} 至 {{scope.row.leaveDate}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column  prop="min_price" label="价格/元" align="center" sortable>
                  <template slot-scope="scope" v-if="scope.row.is_payment =='N'">
                    <p>总价：{{scope.row.order_total | priceFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column  align="center" >
                  <template slot-scope="scope"  v-if="scope.row.is_payment =='N'">
                    <el-button type="warning" round @click="checkOrder(scope.row)">
                      <span v-if="scope.row.is_payment == 'N'">待付款</span>
                      <span v-if="scope.row.is_payment == 'Y'">已付款</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>


            </el-tab-pane>
            <el-tab-pane label="待使用" name="paid">角色管理</el-tab-pane>
            <el-tab-pane label="退款/售后" name="refund/after_sales">定时任务补偿</el-tab-pane>
          </el-tabs>
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
        order:[],
        isShow:false

      }
    },
    methods:{
      getOrder:function(){
        var url = this.Host + '/getOrder';
        this.$axios.get(url).then(res => {
          if(res.data){
            this.order = res.data;
            console.log(this.order);
          }else{
            this.$message.error("获取订单信息失败！");
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
