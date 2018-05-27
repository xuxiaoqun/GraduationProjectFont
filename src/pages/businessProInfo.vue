<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="produceInfo"></Aside>
      </el-aside>
      <el-main>
        <div>
          <el-table :data="proInfo" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="有效日期 :">
                    <span>{{ props.row.startDate }}至{{ props.row.endDate }}</span>
                  </el-form-item>
                  <el-form-item label="可住 :">
                    <span>{{ props.row.capacity }}</span>
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
            <el-table-column label="酒店名称" prop="hotelName">
            </el-table-column>
            <el-table-column label="酒店房型" prop="houseType">
            </el-table-column>
            <el-table-column label="床型" prop="bedType">
            </el-table-column>
            <el-table-column label="价格" prop="price">
            </el-table-column>
            <el-table-column label="房间个数" prop="amount">
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
          <el-dialog title="修改当前房型信息" :visible.sync="dialogVisible" width="35%"
                     :show-close="show_close"
                     :close-on-click-modal="modal"
                     :close-on-press-escape="escape">
            <div style="width: 80%; position: relative;top: 40%;transform: translateY(20%);">
              <el-form ref="pro" :model="pro" label-width="80px"
                       label-position="left" size="small ">
                <el-form-item  label=" 房型名称:">
                  <el-input v-model="pro.houseType" ></el-input>
                </el-form-item>
                <el-form-item  label=" 房型价格:">
                  <el-input v-model="pro.price" ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="changeMsg(pro)">确 定</el-button>
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
        proInfo: [],
        url:this.Host + '/',
        dialogVisible:false,
        pro:{},
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
        this.pro = row;
        this.dialogVisible = true;
      },
      handleDelete : function(index, row) {
        this.$store.dispatch("deleteProById",row);
        for( var i = 0; i < this.proInfo.length; i ++){
          if(row.produce_id == this.proInfo[i].produce_id){
            this.proInfo.splice(i,1);
          }
        }
      },
      changeMsg : function (pro) {
        var url = this.Host + '/updatePro';
        this.$axios.post(url,pro).then(res => {
          if(res.data){
            this.$message.success("该房型信息更新成功！");
          }else{
            this.$message.error("该房型信息更新失败！");
          }
        }).catch(function(error){
          console.log(error);
        })
        this.dialogVisible = false;
      },

      cancel : function () {
        this.dialogVisible = false;
        this.getProInfo();

      },
      getProInfo : function () {
        var url = this.Host + '/getProInfo';
        this.$axios.post(url, JSON.parse(window.localStorage.getItem("consumer"))).then(res => {
          this.proInfo  = res.data;
          console.log(this.proInfo);
        }).catch(function(error){
          console.log(error);
        })
      }

    },
    created: function(){
      this.getProInfo();
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
