<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside active="releaseHotel"></Aside>
      </el-aside>
      <el-main>
        <el-form ref="form" :model="form" label-width="85px" :rules="rules" status-icon>
          <el-form-item label="酒店名称:"  prop="name">
            <el-input v-model="form.name" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="酒店地址:"  prop="address">
            <el-input v-model="form.address" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="phone">
            <el-input v-model="form.phone" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="星级:" prop="star">
            <el-radio-group v-model="form.star" style="width: 50%">
              <el-radio label="经济型"></el-radio>
              <el-radio label="舒适/三星"></el-radio>
              <el-radio label="高档/四星"></el-radio>
              <el-radio label="豪华/五星"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开业日期:" prop="openTime">
            <el-col>
              <el-date-picker type="date" placeholder="选择日期" v-model="form.openTime" style="width: 50%"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="酒店标签:" prop="flag">
            <el-checkbox-group v-model="form.flag" style="width: 50%">
              <el-checkbox label="无线上网" name="flag"></el-checkbox>
              <el-checkbox label="有线上网" name="flag"></el-checkbox>
              <el-checkbox label="免费停车" name="flag"></el-checkbox>
              <el-checkbox label="餐厅" name="flag"></el-checkbox>
              <el-checkbox label="行李寄存" name="flag"></el-checkbox>
              <el-checkbox label="接送服务" name="flag"></el-checkbox>
              <el-checkbox label="健身房" name="flag"></el-checkbox>
            </el-checkbox-group>
          </el-form-item >
          <el-form-item label="酒店图片:" prop="picture">
            <el-upload
              :action="action"
              :data="upLoadData"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload"
              :on-success="success"
              multiple
              :before-remove="beforeRemove"
              :on-remove="onRemove">
              <el-button round  type="primary" size="small">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="onSubmit('form')">创建</el-button>
            <el-button type="primary"  @click="resetForm('form')">取消</el-button>
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

        action:this.Host + '/uploadFile',
        upLoadData:{
          hotelName:''
        },
        form: {
          name: '',
          address: '',
          star: '',
          phone: '',
          picture:[],
          openTime: '',
          flag:[],
          consumer_id: this.$store.state.consumer.id
        },
        pictures:[

        ],
        rules: {
          name: [
            { required: true, message: '请输入酒店名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入酒店地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          star: [
            { required: true, message: '请选择酒店星级', trigger: 'blur' }
          ],
          openTime: [
            { type: 'date', required: true, message: '请选择开业日期', trigger: 'blur' }
          ],
          flag: [
            { type: 'array', required: true, message: '请至少选择一个酒店标签', trigger: 'change' }
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
            var url = this.Host + '/releaseHotel';
            this.$axios.post(url,this.form).then(res => {
              if(res.data){
                this.$message.success('成功发布酒店信息！');
                this.$router.push({path: '/business/hotelInfo'});
              }else{
                this.$message.error('酒店信息发布失败，请稍后再试！');
              }
            });
          }
        })
      },
      success:function(response, file, fileList){
       this.form.picture.push(response);
        let obj = {
          k : file.name,
          v : response
        };
        this.pictures.push(obj);
        console.log(this.pictures);
      },
      beforeAvatarUpload:function(file) {
        if(this.form.name === ''){
          this.$message.error("请先填写其他酒店信息！");
          return false;
        }
        this.upLoadData.hotelName = this.form.name;
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
      onRemove:function(file, fileList){
        //删除数组中的
        let array1 = this.pictures;
        let array2 = this.form.picture;
        let deleteVue = '';
        for(let i = 0; i < array1.length ; i ++){
          if(array1[i].k === file.name){
            deleteVue = array1[i].v;
          }
        }
        for(let i = 0 ; i < array2.length; i ++){
          if(array2[i] === deleteVue){
            this.form.picture.splice(i,1);
          }
        }
      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
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
