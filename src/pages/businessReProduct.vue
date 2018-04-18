<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="releaseProduct"></Aside>
      </el-aside>
      <el-main>
        <el-form ref="form" :model="form" label-width="90px" :rules="rules" status-icon>
          <el-form-item label="对应酒店:" prop="hotel_id" >
            <el-radio-group v-model="form.hotel_id" style="width: 50%" >
              <el-radio :label="key.hotel_id" v-for="key in hotelInfo" :key="key.hotel_id">{{key.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房型:"  prop="houseType">
            <el-input v-model="form.houseType" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="床型:"  prop="bedType">
            <el-input v-model="form.bedType" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="价格:"  prop="price">
            <el-input v-model="form.price" style="width: 50%"></el-input>
          </el-form-item>

          <el-form-item label="日期:"  prop="date">
            <el-date-picker v-model="form.date" type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1">

            </el-date-picker>
          </el-form-item>
          <el-form-item label="可住:" prop="capacity">
            <el-radio-group v-model="form.capacity" style="width: 50%">
              <el-radio label="1人"></el-radio>
              <el-radio label="2人"></el-radio>
              <el-radio label="3人"></el-radio>
              <el-radio label="4人"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签:" prop="flag">
            <el-checkbox-group v-model="form.flag" style="width: 50%">
              <el-checkbox label="WiFi" name="flag"></el-checkbox>
              <el-checkbox label="电脑" name="flag"></el-checkbox>
              <el-checkbox label="独立卫浴" name="flag"></el-checkbox>
              <el-checkbox label="含早餐" name="flag"></el-checkbox>
              <el-checkbox label="含窗户" name="flag"></el-checkbox>
            </el-checkbox-group>
          </el-form-item >
          <el-form-item label="房间数量:"  prop="amount">
            <el-input-number v-model="form.amount" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="房间图片:" prop="picture">
            <el-upload
              :action="action"
              :data="upLoadData"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload"
              :on-success="success"
              multiple
              :before-remove="beforeRemove">
              <el-button size="small" type="primary" round>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过10M</div>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">创建</el-button>
            <el-button type="primary" @click="resetForm('form')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Aside from '@/components/businessAside'
  export default {
    name: '',
    data: function(){
      return {
        pickerOptions1:{
          disabledDate:function(time){
            return time.getTime() < (Date.now()-3600*24*1000);
          }
        },
        action:this.Host + '/uploadHouseFile',
        upLoadData:{
          houseName:'',
          hotelName:''
        },
        form: {
          hotel_id:'',
          houseType: '',
          bedType: '',
          price: '',
          amount: 1,
          date:'',
          capacity:'',
          flag:[],
          picture:[]
        },
        hotelInfo:[],
        rules: {
          hotel_id: [
            { required: true, message: '请选择对应酒店名称', trigger: 'blur' }
          ],
          houseType: [
            { required: true, message: '请输入房型名称', trigger: 'blur' }
          ],
          bedType: [
            { required: true, message: '请输入床型', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '请选择数量', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          capacity: [
            { required: true, message: '请选择可住人数', trigger: 'blur' }
          ],
          flag: [
            { type: 'array', required: true, message: '请至少选择一个房间标签', trigger: 'change' }
          ],
          picture: [
            { type: 'array', required: true, message: '请至少上传一张图片', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      onSubmit:function(formName){
        this.$refs[formName].validate((valid) =>{
          if (valid) {
            var url = this.Host + '/releaseProduct';
            this.$axios.post(url,this.form).then(res => {
              if(res.data){

                this.$message.success('成功发布房型信息！');
                this.$router.push({path: '/business/produceInfo'});

              }else{
                this.$message.error('酒店信息发布失败，请稍后再试！');
              }
            });
          }
        })
      },
      success:function(response, file, fileList){
        this.form.picture.push(response);
      },
      beforeAvatarUpload:function(file) {
        if(this.form.name === '' || this.form.hotel_id === ''){
          this.$message.error("请先填写其他房型信息！");
          return false;
        }
        this.upLoadData.houseName = this.form.houseType;
        for(var i = 0; i < this.hotelInfo.length; i ++){
          if(this.hotelInfo[i].id === this.form.hotel_id){
            this.upLoadData.hotelName = this.hotelInfo[i].name;
          }
        }
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt2M;
      },
      beforeRemove:function(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      },
      getHotelInfo : function () {
        var url = this.Host + '/getHotelInfo';
        this.$axios.post(url,this.$store.state.consumer).then(res => {
          this.hotelInfo  = res.data;
          console.log(this.hotelInfo);
        }).catch(function(error){
          console.log(error);
        })
      }

    },
    components:{
      Aside
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
  .el-main{
    height: 470px
  }

</style>
