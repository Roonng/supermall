<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image"  @load="swiperLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    data(){
      return {
        imgload: false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    props: {
      banners:{
        type: Array,
        default(){
          return []
        }
      }
    },
    methods: {
      swiperLoad(){
        if(!this.imgload){
          this.$emit("swiperImgLoad")
          this.imgload = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
