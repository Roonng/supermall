<template>
  <nav-bar>
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartNavBar",
    components: {
      NavBar
    },
    computed: {
      //获取store里的getters中的方法
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>

</style>
