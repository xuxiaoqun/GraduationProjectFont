<template>
  <div>
    <h1>{{hotelProInfo.hotel_name}}({{hotelProInfo.hotel_address}})</h1>
    <div style="width:58%" id="image">
      <el-carousel indicator-position="outside" height="300px">
        <el-carousel-item v-for="item in hotelProInfo.hotel_picture" :key="item">
          <img :src="url+item" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="text" style="margin-left: 10px">
        <div style="margin-left: 20px;margin-top: 10px">
          <div v-if="hotelProInfo.hotel_grade == 0">
            <p style="color: orange">暂时没有人评价哦~</p>
          </div>
          <div v-else>
            <el-rate
              v-model="hotelProInfo.hotel_grade"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}" style="text-align: left">
            </el-rate>
          </div>
          <br><hr><br>
          <p>开业时间：{{hotelProInfo.hotel_opemTime}}</p><br><br>
          <p>电话：{{hotelProInfo.hotel_phone}}</p><br><br>
          <div >
            <ul>
              <li v-for="item in hotelProInfo.hotel_fag" :key="item"  style="text-align: center">
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
    &nbsp;
    <div >
      <div >
        <el-form :inline="true" :model="formSearch">
          <el-form-item>
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
    </div>

    <div id="message">
      <el-tabs value="first"  type="border-card">
        <el-tab-pane label="房型预订" name="first">
        <el-table :data="hotelProInfo.pro_info" style="width: 100%;"
                  border  :show-header="isShow"
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
        <el-tab-pane label="用户点评" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hotelInfo',
    data: function(){
      return {
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
        hotelProInfo:{},
        isShow:false,
        parm:{
          hotel_id:'',
          startDate:'',
          endDate:''
        }
      }
    },
    methods:{
      getHotelProInfoById:function () {
        this.parm.startDate = this.formSearch.date[0];
        this.parm.endDate = this.formSearch.date[1];
        var url = this.Host + '/getHotelProInfoById';
        this.$axios.post(url,this.parm).then(res => {
          if(res.data){
            this.hotelProInfo = res.data;
            console.log(res.data);
          }else{
            this.$message.error("该酒店今天没开业！");
            this.$router.push({path: '/'});
          }
        });
      },
      search:function(){
        this.parm.startDate = this.formSearch.date[0];
        this.parm.endDate = this.formSearch.date[1];
        var url = this.Host + '/getHotelProInfoById';
        this.$axios.post(url,this.parm).then(res => {
          if(res.data){
            this.hotelProInfo = res.data;
          }else{
            this.hotelProInfo.pro_info = [];
          }
        });
      },
      reserve : function(row){
        console.log(row);
      }
    },
    created:function(){
      var parms = window.location.hash.split('?')[1].split('&');
      var hotel_id = parms[0].split('=')[1];
      var startDate = parms[1].split('=')[1];
      var endDate = parms[2].split('=')[1];
      this.formSearch.date[0] = startDate;
      this.formSearch.date[1] = endDate;
      this.parm.hotel_id = hotel_id;
      this.getHotelProInfoById();
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
  #image {float: left; height: 300px; background-color: white}
  #text { float: left; width: 41%;height: 300px;text-align: left;background-color: white}
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
  ul {
    width: 300px; /*设置足够的宽度*/
    overflow: hidden;
    white-space:nowrap; /*处理块元素中的空白符和换行符的，这个属性保证图片不换行*/
  }
  li{
    list-style: none;
    float: left; /*向左排列*/
    margin-right: 15px;
    width: 80px;
  }
</style>
