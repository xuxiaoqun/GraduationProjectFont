import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'
import router from '@/router'
Vue.use(Vuex)


const me = new Vue({});
export default new Vuex.Store({
  state:{
    consumer:{
      name:'',
      id:''
    },
    hotel:[]
    //webUrl:'http://localhost:8081/',
    //picture:{
    //  hotel:[],
    //  produce:[]
    //}
  },
  mutations:{
    //所有改变store中数据的方法集合


    changeConsumer(state,consumer){
      state.consumer = consumer;
    },
    changeConsumerFild(state,obj){
      if(obj.key === 'name'){
        state.consumer.name = obj.value;
      }else if(obj.key === 'password')
        state.consumer.password = obj.value;
    }


  },
  actions:{
    //可以进行异步操作，将获得的值传参到mutations里面的方法中
    changeConsumer(context,consumer){
      var url = this._vm.Host + '/updateConsumer';
      Axios.post(url,consumer).then(res => {
        if(res.data) {
          this._vm.$message.success("信息变更成功！");
        }else{
          this._vm.$message.error("信息变更失败！");
        }
      }).catch(function(error){
        console.log(error);
      })
    },

    deleteHotelById({ dispatch, commit },hotel){
      var url = this._vm.Host + '/deleteHotel';
      Axios.post(url,hotel).then(res => {
        "use strict";
        if(res.data){
          console.log(res.data);
          this._vm.$message.success("酒店已经删除！");
        }
      }).catch(function(error){
        console.log(error);
      })

    },
    deleteProById(context,hotel){
      var url = this._vm.Host + '/deletePro';
      Axios.post(url,hotel).then(res => {
        "use strict";
        if(res.data){
          this._vm.$message.success("房型已经删除！");
        }
      }).catch(function(error){
        console.log(error);
      })

    },
    getConsumer(context){
      var url = this._vm.Host + '/getConsumer';
      Axios.get(url).then(res => {
        if(res.data){
          context.commit("changeConsumer",res.data);
        }else{
          var consumer = { name:null, id:null };
          this._vm.$message.error('当前用户还未登录，请登录后再进行此操作！!');
          context.commit("changeConsumer",consumer);
          router.push({name: 'login'})
        }
      });
    }

  }
})
