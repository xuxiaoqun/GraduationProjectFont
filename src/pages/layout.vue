<template>
  <div >
    <div >
      <el-form :inline="true" :model="formSearch">
        <el-form-item label="入住城市">
          <el-input  type="text" readonly value="哈尔滨"></el-input>
        </el-form-item>
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
          <el-button type="primary"  round icon="el-icon-search" @click="search">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="hotelInfo" style="width: 100%;"
                 height="405px" highlight-current-row
                :default-sort = "{prop: 'min_price', order: 'descending'}"
                v-loading="loading">
        <el-table-column   label="图片" align="center">
          <template slot-scope="scope">
            <img :src="url + scope.row.hotel_picture[0]" width="200px" height="80px" />
          </template>
        </el-table-column>
        <el-table-column  prop="hotel_name" label="酒店名称" align="center">
        </el-table-column>
        <el-table-column  prop="hotel_address" label="酒店地址" align="center">
        </el-table-column>
        <el-table-column  prop="min_price" label="价格/元" align="center" sortable>
          <template slot-scope="scope">
            {{scope.row.min_price | priceFilter}}
          </template>
        </el-table-column>
        <el-table-column  prop="hotel_grade" label="评分(满分5)" align="center" sortable>
          <template slot-scope="scope">
            {{scope.row.hotel_grade | gradeFilter}}
          </template>
        </el-table-column>
        <el-table-column  align="center" label="详情">
          <template slot-scope="scope">
            <el-button type="warning" round @click="getInfo(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>

 import Bus from '@/components/bus.js'
  export default {
    name: 'Layout',
    data: function(){
      return {
        loading: true,
        url:this.Host + '/',
        pickerOptions1:{
          disabledDate:function(time){
            return time.getTime() < (Date.now()-3600*24*1000);
          }
        },
        formSearch: {
          date:[],
        },
        hotelInfo:[]
      }
    },
    methods:{
      getInfo:function(row){
        this.$router.push({name: 'hotelInfo',query: { hotel_id: row.hotel_id,date:this.formSearch.date}})
      },
      getHotelProInfo : function () {
        var url = this.Host + '/getHotelProInfo';
        var date = {
          startDate:this.formSearch.date[0],
          endDate:this.formSearch.date[1]
        };
        this.$axios.post(url,date).then(res => {
          this.hotelInfo  = res.data;
          this.loading = false;
        }).catch(function(error){
          console.log(error);
        })
      },
      search:function(){
        this.getHotelProInfo();
      }
    },
    created : function () {
      var date = new Date();
      var month = date.getMonth() + 1;
      var d = date.getDate();
      date.setDate(d + 1);
      var nextDay = date.getDate();
      var nextMonth = month;
      if(d > nextDay){
        nextMonth = nextMonth + 1;
      }
      if(month < 10){
        month = '0' + month;
      }
      if(nextMonth < 10){
        nextMonth = '0' + nextMonth;
      }
      if(d < 10){
        d = '0' + d;
      }
      if(nextDay < 10){
        nextDay = '0' + nextDay;
      }
      console.log(nextDay);
      console.log(nextMonth);
      var startDate = date.getFullYear()+'-'+ month+'-'+ d;
      this.formSearch.date[0] = startDate
      var endDate =date.getFullYear()+'-'+nextMonth+'-'+nextDay;
      this.formSearch.date[1] = endDate
    },
    mounted:function(){
      this.getHotelProInfo();
    },
    filters: {
      gradeFilter: function (value) {
        switch(true)
        {
          case value >= 4.5:
            return value + ' 分 很好';
            break;
          case value >= 4:
            return value + ' 分 好';
            break;
          case value >= 3.5:
            return value + ' 分 一般';
            break;
          case value == 0:
            return  '暂时没有人评价哦';
            break;
          default:
           return value + '差';
        }
      },
      priceFilter:function(value){
        if(value){
          return '￥' + value + ' 起';
        }
      }

    }
  }

</script>
<style scoped>

</style>
