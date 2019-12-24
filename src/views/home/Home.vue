<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isshowTabbar" :class="{fiexd: isshowTabbar}"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollPosition="showScrollTop"
      :pullUpLoad="true"
      @pullingUp="scrollUpload"
      >
      <home-swiper :banners="banners" @swiperImgLoad="swiperimgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NarBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {request} from "../../network/request";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []}
        },
        currentType: 'pop',
        tabBarOffsetTop:0,
        isShowBackTop: false,
        isshowTabbar: false,
      }
    },
    created(){
      //获取主页多数据
      this.getHomeMultidata();
      //获取商品数据
      this.getHomeGoods('pop',0);
      this.getHomeGoods('new',0);
      this.getHomeGoods('sell',0);

    },
    mounted(){
      this.$bus.$on('imgOnload',() =>{
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      /**
       * 事件监听
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      //监听tabControl上方高度
      swiperimgLoad(){
        this.tabBarOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      showScrollTop(position){
        this.isShowBackTop = -position.y >1000
        this.isshowTabbar = -position.y > this.tabBarOffsetTop
      },
      scrollUpload(){
        this.getHomeGoods(this.currentType)
      },

      /**
       * 网络请求
       */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res =>{
          console.log(res);
          this.goods[type].page += 1;
          this.goods[type].list.push(...res.data.data.list);
          this.$refs.scroll.finishPullup()
        })
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    /*position: sticky;*/
    /*top: 44px;*/
    /*background: #fff;*/
    /*z-index: 9;*/
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .fiexd{
    position: fixed;
    z-index: 9;
    background: #fff;
    width: 100%;
  }
</style>
