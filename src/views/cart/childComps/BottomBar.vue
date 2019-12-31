<template>
  <div class="bottom-menu">
    <div class="all" @click.navtie="selectAll">
      <CheckButton class="select-all"
                   :isActive="isSelectAll"
                   ></CheckButton>
      <span>全选</span>
    </div>

    <span class="total-price">合计: {{getTotalPrice}}</span>
    <span class="buy-product" @click="payFor">去结账 ({{getProLength}})</span>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: "ButtomBar",
    components: {
      CheckButton
    },
    methods: {
      selectAll(){
        if(this.isSelectAll){
          this.cartList.filter(item => item.checked = false)
        }else{
          this.cartList.filter(item => item.checked = true)
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      //计算购物车总价
      getTotalPrice(){
        return '¥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      getProLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.cartList.length == 0){
          return false
        }else{
          return !this.cartList.find(item => !item.checked)
        }
      },
    },
    methods: {
      payFor(){
        if(!this.getProLength || this.getProLength == 0){
          this.$toast.show('请选择商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .all{
    position: fixed;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    /*left: 12px;*/
    right: 35px;
    top: 13px;
  }


  .bottom-menu .total-price {
    margin-left: 40px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
