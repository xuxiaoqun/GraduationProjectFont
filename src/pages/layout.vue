<template>
  <div >
    <div >
      <el-form :inline="true" :model="formSearch">
        <el-form-item label="入住城市">
          <el-input v-model="formSearch.city" type="text" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="formSearch.date" type="daterange"
                          range-separator="至"
                          start-placeholder="入住日期"
                          end-placeholder="离店日期"
                          :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        <el-form-item>
          <el-button type="primary"  round icon="el-icon-search">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="hotelInfo" style="width: 100%;"
                border height="405px" highlight-current-row
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
        pickerOptions2:{
          disabledDate:function(time){
            return time.getTime() < (Date.now()-3600*24*1000);
          }
        },
        formSearch: {
          city: '哈尔滨',
          date:'',
          keyword:''
        },
        hotelInfo:[]
      }
    },
    methods:{
      getInfo:function(row){
        this.$router.push({name: 'hotelInfo',query: { hotel_id: row.hotel_id }})
      },
      getHotelInfo : function () {
        var url = this.Host + '/getHotelProInfo';
        this.$axios.get(url).then(res => {
          this.hotelInfo  = res.data;
          this.loading = false;
        }).catch(function(error){
          console.log(error);
        })
      }
    },
    created : function () {
      this.getHotelInfo();
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
