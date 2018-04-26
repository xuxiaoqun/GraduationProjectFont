<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="hotelInfo"></Aside>
      </el-aside>
      <el-main>
        <div>
          <el-table :data="hotelInfo" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="开业时间 :">
                    <span>{{ props.row.openTime }}</span>
                  </el-form-item>
                  <el-form-item label="星级 :">
                    <span>{{ props.row.star }}</span>
                  </el-form-item>
                  <el-form-item label="标签 :">
                    <span>{{ props.row.flag }}</span>
                  </el-form-item>
                  <el-form-item label="图片 :">
                    <div style="width:250px">
                      <el-carousel indicator-position="outside" height="150px">
                        <el-carousel-item v-for="item in props.row.picture" :key="item">
                          <img :src="url+item" width="100%" height="100%">
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="酒店名称" prop="name">
            </el-table-column>
            <el-table-column label="酒店地址" prop="address">
            </el-table-column>
            <el-table-column label="联系方式" prop="phone">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"  circle
                  @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete" circle
                  @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-dialog title="修改当前酒店信息" :visible.sync="dialogVisible" width="35%"
                     :show-close="show_close"
                     :close-on-click-modal="modal"
                     :close-on-press-escape="escape">
            <div style="width: 80%; position: relative;top: 40%;transform: translateY(20%);">
              <el-form ref="hotel" :model="hotel" label-width="80px"
                       label-position="left" size="small ">
                <el-form-item  label=" 酒店地址:">
                  <el-input v-model="hotel.address" ></el-input>
                </el-form-item>
                <el-form-item  label=" 联系方式:">
                  <el-input v-model="hotel.phone" ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="changeMsg(hotel)">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>

  </div>
</template>
<script>
  import Aside from '@/components/businessAside'

  export default {
    name: 'myInfo',
    data: function () {
      return {
        hotelInfo: [],
        url:this.Host + '/',
        dialogVisible:false,
        hotel:{},
        show_close:false,
        modal:false,
        escape:false
      }
    },
    components: {
      Aside
    },
    methods: {
      handleEdit : function(index, row) {
        this.hotel = row;
        this.dialogVisible = true;
    },
      handleDelete : function(index, row) {
        this.$store.dispatch("deleteHotelById",row);
        for( var i = 0; i < this.hotelInfo.length; i ++){
          if(row.hotel_id == this.hotelInfo[i].hotel_id){
            this.hotelInfo.splice(i,1);
          }
        }
      },
      changeMsg : function (hotel) {
        var url = this.Host + '/updateHotel';
        this.$axios.post(url,hotel).then(res => {
          if(res.data){
            this.$message.success("该酒店信息更新成功！");
          }else{
            this.$message.error("该酒店信息更新失败！");
          }
        }).catch(function(error){
          console.log(error);
        })
        this.dialogVisible = false;
      },

      cancel : function () {
        this.dialogVisible = false;
        this.getHotelInfo();

      },
      getHotelInfo : function () {
        var url = this.Host + '/getHotelInfo';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          if(res.data){
            this.hotelInfo  = res.data;
          }else{
            this.$message.error("获取酒店信息失败！");
          }

        }).catch(function(error){
          console.log(error);
        })
      }

  },
    created: function(){
      this.getHotelInfo();
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

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-carousel__item{
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
