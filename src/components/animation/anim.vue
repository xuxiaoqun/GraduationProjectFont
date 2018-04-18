<template>
  <div>
    <p>今日特惠价：{{money | moneyChange}}</p>
  </div>

</template>
<script>
  export default {
    name: 'anim',
    data: function () {
      return{
        money:20
      }
    },
    filters:{
      moneyChange: function (money) {
        if(typeof money === 'number'){
          return '￥' + money;
        }else{
          return money;
        }
      }
    }
  }
</script>
<style>

</style>
