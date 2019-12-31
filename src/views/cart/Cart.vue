<template>
  <div class="cart">
    <cart-nav-bar class="navBar"/>
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <bottom-bar />
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartNavBar from './childComps/CartNavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

  export default {
    name: "Cart",
    components: {
      Scroll,
      CartNavBar,
      CartList,
      BottomBar
    },
    computed: {

    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }

  .navBar{
    position: relative;
    background: var(--color-tint);
    color: #fff;
    z-index:9;
  }
  .content{
    height: calc(100% - 44px - 49px - 44px);
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
  }
</style>
