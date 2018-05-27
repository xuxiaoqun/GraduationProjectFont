<template>
  <div>
    <h1>{{hotel.name}}({{hotel.address}})</h1>
    <div style="width:54%" id="image">
      <el-carousel indicator-position="outside" height="300px">
        <el-carousel-item v-for="item in hotel.picture" :key="item">
          <img :src="url+item" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="text" >
        <div style="margin-left: 20px;margin-top: 10px">
          <div v-if="hotel.grade == 0">
            <p style="color: orange">暂时没有人评价哦~</p>
          </div>
          <div v-else>
            <el-rate
              v-model="hotel.grade"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}" style="text-align: left">
            </el-rate>
          </div>
          <br><hr><br>
          <p>开业时间：{{hotel.openTime}}</p><br><br>
          <p>电话：{{hotel.phone}}</p><br><br>
          <div >
            <ul class="ui">
              <li v-for="item in hotel.flag" :key="item"  style="text-align: center" class="li">
                <div v-show="item == '无线上网'">
                  <img :src="path + item + size" width="30px" height="30px"/>
                </div>
                <div v-show="item == '有线上网'">
                  <img :src="path + item + size" width="30px" height="30px"/>
                </div>
                <div v-show="item == '免费停车'">
                  <img :src="path + item + size" width="30px" height="30px"/>
                </div>
                <div v-show="item == '餐厅'">
                  <img :src="path + item + size" width="30px" height="30px"/>
                </div>
                <div v-show="item == '行李寄存'">
                  <img :src="path + item + size" width="30px" height="30px"/>
                </div>
                <div v-show="item == '健身房'">
                  <img :src="path + item + size" width="30px" height="30px"/>
                </div>
                <div v-show="item == '接送服务'">
                  <img :src="path + item + size" width="30px" height="30px"/>
                </div>
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <br>
    <br>
    <div style="clear: both;padding-top: 0">
        <el-form :inline="true" :model="formSearch" style="padding-top: 10px">
          <el-form-item>
            <label style="padding-right: 5px">入住和离店日期：</label>
            <el-date-picker v-model="formSearch.date" type="daterange"
                            range-separator="至"
                            start-placeholder="入住日期"
                            end-placeholder="离店日期"
                            :picker-options="pickerOptions1"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  round icon="el-icon-search" @click="search">重新查询</el-button>
          </el-form-item>
        </el-form>
    </div>

    <div id="message">
      <el-tabs value="produce"  type="border-card" @tab-click="getInfo">
        <el-tab-pane label="房型预订" name="produce">
        <el-table :data="proInfo" style="width: 100%;"
                    :show-header="isShow"
                  size="small">
          <el-table-column   label="图片" align="left" width="800">
            <template slot-scope="scope">
              <div class="house_type">
                <el-carousel indicator-position="outside" height="120px" style="width: 100%">
                  <el-carousel-item v-for="item in scope.row.pro_picture" :key="item.pro_id">
                    <img :src="url+item" width="100%" height="100%">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div style="margin-left: 10px; float: left">
                <h1>{{scope.row.pro_houseType}}</h1>
                <br>
                <p>
                  <span v-for="item in scope.row.pro_flag" :key="item" style="font-size: 13px;">
                  <span v-if="item == 'WiFi'">上网：</span>
                  <span v-if="item == '电脑'">上网：</span>
                  <span v-if="item == '独立卫浴'">卫浴：</span>
                  <span v-if="item == '含窗户'">窗户：</span>
                  <span v-if="item == '含早餐'">早餐：</span>
                  <span>{{item}} &nbsp;|&nbsp;</span>
                </span>
                </p>
                <br>
                <p style="font-size: 13px;">床型：&nbsp;{{scope.row.pro_bedType}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column >
            <template slot-scope="scope">
              <span style="font-size: 15px">{{scope.row.pro_price | priceFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.pt_restAmount == '0'">
                <el-button type="info" round disabled >已经满房啦！</el-button>
              </div>
              <div v-else>
                <el-button type="warning" round @click="reserve(scope.row)">预订</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-tab-pane label="用户点评" name="evaluation">

          <el-table :data="evaluation" style="width: 100%;"
                    :show-header="isShow"
                    size="small">
            <el-table-column  align="left">
              <template slot-scope="scope">
                <div>
                 <div>
                   <span style="font-size: 15px">{{scope.row.consumer_name}}</span>
                   <span style="float:right">{{scope.row.eva_date}}</span>
                 </div>
                 <div>
                   <el-rate
                     v-model="scope.row.eva_grade"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{value}" style="text-align: left">
                   </el-rate>
                 </div>
                  <div>
                    <span>{{scope.row.eva_msg}}</span>
                  </div>
                  <div>
                    <span>房型：</span>
                    <span>{{scope.row.houseType}}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
      </el-tabs>

      <el-dialog
        title="订单信息" :visible.sync="dialogVisible" width="40%"  center>
        <div style="text-align: left">
          <span style="font-size: 17px">预订信息</span><br><br>
          <span>房型名称:</span>
          &nbsp;&nbsp;&nbsp;
          <span>{{pro.pro_houseType}}</span><br>
          <span>入离日期:</span>
          &nbsp;&nbsp;&nbsp;
          <span>{{formSearch.date[0]}}&nbsp;至&nbsp;{{formSearch.date[1]}}</span><br>
          <span>房间数量:</span>
          &nbsp;&nbsp;&nbsp;
          <el-select v-model="checkIn_Info.pro_amount" placeholder="请选择" size="small">
            <el-option
              v-for="item in pro_amount"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select><br>
          <span>订单总额:</span>
          &nbsp;&nbsp;&nbsp;
          <span style="color: red;font-size: 16px">
            <span style="color: red;font-size: 12px">￥</span>
            {{pro.pro_price * checkIn_Info.pro_amount}}
          </span><br>
          <br><br>
          <span style="font-size: 17px">入住信息</span><br>
          </div>
        <div style="width: 70%; position: relative;top: 40%;transform: translateY(20%);">
          <el-form ref="checkIn_Info" :model="checkIn_Info" label-width="90px"
                   label-position="left" :rules="rules" status-icon >
            <el-form-item  label=" 入住人:" prop="name">
              <el-input v-model="checkIn_Info.name" placeholder="入住人姓名" size="small"></el-input>
            </el-form-item>
            <el-form-item  label=" 联系方式:" prop="email">
              <el-input v-model="checkIn_Info.email" placeholder="入住人邮箱" size="small"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit_order('checkIn_Info')">提交订单</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hotelInfo',
    data: function(){
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入入住人邮箱'));
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
      return {
        pro_amount:[],
        formSearch:{
          date:[]
        },
        pickerOptions1:{
          disabledDate:function(time){
            return time.getTime() < (Date.now()-3600*24*1000);
          }
        },
        size:'.png',
        url:this.Host + '/',
        path:this.Host + '/picture/icon/',
        loading:true,
        hotel:{},
        proInfo:[],
        evaluation:[],
        isShow:false,
        parm:{
          hotel_id:'',
          arrivalDate:'',
          leaveDate:''
        },
        checkIn_Info:{
          name:'',
          email:'',
          pro_amount:1,
        },
        pro:{},
        dialogVisible: false,
        rules:{
          name: [
            { required: true, message: '请输入入住人姓名', trigger: 'blur' }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur', required: true }
          ]
        }

      }
    },
    methods:{
      getHotelProInfoById:function () {
        var url = this.Host + '/getHotelProInfoById';
        this.$axios.post(url,this.parm).then(res => {
          if(res.data){
            this.hotel = res.data;
            console.log(res.data);
          }else{
            this.$message.error("该酒店今天没开业！");
            this.$router.push({path: '/'});
          }
        })
      },
      search:function(){
        this.parm.arrivalDate = this.formSearch.date[0];
        this.parm.leaveDate = this.formSearch.date[1];
        var url = this.Host + '/getProInfoById';
        this.$axios.post(url,this.parm).then(res => {
          if(res.data){
            this.proInfo = res.data;
          }else{
            this.proInfo = [];
          }
        });
      },
      reserve : function(row){
        if( !window.localStorage.getItem("consumer")){
          this.$message.error('当前用户还未登录，请登录后再进行此操作！!');
          this.$router.push({path: '/login'})
          return;
        }
        this.pro = row;
        var amount = new Array();
        for(var i = 0; i < parseInt(row.pt_restAmount); i++){
          amount[i] = i + 1;
        }
        this.pro_amount = amount;
        this.dialogVisible = true;
      },
      submit_order:function(formName){
        this.$refs[formName].validate((valid) =>{
          if (valid) {
            var url = this.Host + '/takeOrder';
            var data = {
              consumer_id:this.$store.state.consumer.id,
              occupant_name:this.checkIn_Info.name,
              occupant_email:this.checkIn_Info.email,
              hotel_id:this.hotel.hotel_id,
              produce_id:this.pro.pro_id,
              arrivalDate:this.formSearch.date[0],
              leaveDate:this.formSearch.date[1],
              produce_amount:this.checkIn_Info.pro_amount,
              order_total:this.checkIn_Info.pro_amount * this.pro.pro_price
            };
            console.log(data);
            this.$axios.post(url,data).then(res => {
              if(res.data) {
                this.$router.push({path: '/mine/orders'});
                this.dialogVisible = false;
              }else{
                this.$message.error('提交订单失败!');
              }
            }).catch(function(error){
              console.log(error);
            })

          }
        })
      },
      getInfo:function(tablePane){
        if(tablePane.name == 'evaluation'){
          var url = this.Host + '/getEvaluation';
          this.$axios.post(url,this.parm).then(res => {
            if(res.data) {
              this.evaluation = res.data;
              console.log(res.data);
            }else{
              this.evaluation = [];
            }
          }).catch(function(error){
            console.log(error);
          })
        }
      }
    },
    created:function(){
      var parms = window.location.hash.split('?')[1].split('&');
      var hotel_id = parms[0].split('=')[1];
      var arrivalDate = parms[1].split('=')[1];
      var leaveDate = parms[2].split('=')[1];
      this.formSearch.date[0] = arrivalDate;
      this.formSearch.date[1] = leaveDate;
      this.parm.hotel_id = hotel_id;
      this.getHotelProInfoById();
      this.search();
    },
    filters:{
      priceFilter:function(value){
        if(value){
          return '￥' + value + ' 起';
        }
      }
    }

  }
</script>
<style scoped>
  .el-form-item__content{
    padding-bottom: 0;
    padding-top: 10px;

  }
  #image {float: left; height: 300px; background-color: white}
  #text {
    float: right;
    width: 45%;
    height: 300px;
    text-align: left;
    background-color: white;
  }
  #message{
    width: 100%;
    text-align: center;
    clear: both;
  }
  .house_type{
    float: left;
    background-color: white;
    width: 200px;
    margin-top: 0px;
  }
  .ul {
    width: 300px; /*设置足够的宽度*/
    overflow: hidden;
    white-space:nowrap; /*处理块元素中的空白符和换行符的，这个属性保证图片不换行*/
  }
  .li{
    list-style: none;
    float: left; /*向左排列*/
    margin-right: 15px;
    width: 80px;
  }
</style>
