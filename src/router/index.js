import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'
import Introduce from '@/pages/introduce'
import Register from '@/pages/register'
import Login from '@/pages/login'
import HotelInfo from '@/pages/hotelInfo'
import Aside from '@/components/aside'
import My from '@/pages/my'
import MyBasicInfo from '@/pages/myBasicInfo'
import MyCreditInfo from '@/pages/myCreditInfo'
import MyAccount from '@/pages/myAccount'
import MyOrders from '@/pages/myOrders'
import MyEvaluation from '@/pages/myEvaluation'
import Business from '@/pages/business'
import BusinessHotelInfo from '@/pages/businessHotelInfo'
import BusinessReleaseHotel from '@/pages/businessReleaseHotel'
import BusinessReleaseProduct from '@/pages/businessReProduct'
import BusinessProInfo from '@/pages/businessProInfo'
import BusinessSureOrder from '@/pages/businessSureOrder'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout
    },
    {
      path:'/intro',
      component:Introduce
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/hotelInfo',
      name:'hotelInfo',
      component:HotelInfo
    },
    {
      path:'/mine/lx',
      component:My,
      beforeEnter:(to, from, next) =>{
        if(window.localStorage.getItem("consumer")){
          next();
        }else{
          this.a.app.$message.error('当前用户还未登录，请登录后再进行此操作！!');
          next('/login');
        }
      }
    },
    {
      path:'/mine/basicInfo',
      component:MyBasicInfo
    },
    {
      path:'/mine/creditInfo',
      component:MyCreditInfo
    },
    {
      path:'/mine/account',
      component:MyAccount
    },
    {
      path:'/mine/orders',
      component:MyOrders
    },
    {
      path:'/mine/evaluation',
      component:MyEvaluation
    },
    {
      path:'/business/rules',
      component:Business,
      beforeEnter:(to, from, next) =>{
        if(window.localStorage.getItem("consumer")){
          next();
        }else{
          this.a.app.$message.error('当前用户还未登录，请登录后再进行此操作！!');
          next('/login');
        }
      }
    },
    {
      path:'/business/hotelInfo',
      component:BusinessHotelInfo
    },
    {
      path:'/business/releaseHotel',
      component:BusinessReleaseHotel
    },
    {
      path:'/business/releaseProduct',
      component:BusinessReleaseProduct
    },
    {
      path:'/business/produceInfo',
      component:BusinessProInfo
    },
    {
      path:'/business/sureOrder',
      component:BusinessSureOrder
    }

  ]
})
