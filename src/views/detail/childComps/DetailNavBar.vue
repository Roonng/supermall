<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <img slot="left" class="goBack" src="~assets/img/common/back.svg" @click="backClick">
      <div slot="center" class="navBar">
        <div v-for="(item,index) in detailNav"
             class="navBar-item"
             :class="{active: currentIndex == index}" @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    data(){
      return {
        detailNav: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        this.$emit('navBarClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  #detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .navBar{
    display: flex;
    font-size: 13px;
  }
  .navBar-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .goBack{
    margin-top: 10px;
  }
</style>
