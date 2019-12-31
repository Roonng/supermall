<template>
  <div class="detail">
    <detail-nav-bar @navBarClick="navBarClick" ref="navBar"/>
    <scroll class="content"
            ref="scroll"
            @scrollPosition="scrollPosition" :probeType="3">
      <detail-swiper :imgs="swiperImg"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" @detailImgLoad="imgLoad"/>
      <detail-params-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommendInfo" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'


  import {Goods ,getRecommend, getDetailInfo} from 'network/detail'
  import {debounce} from "common/utils";
  import {goodsImgListenerMixin, backToTop} from 'common/mixin'

  import {BACKTOP_DISTANCE} from 'common/const'

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data(){
      return {
        iid: null,
        swiperImg: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: [],
        detailThemeY: [],
        detailThemeFunc: null,
        currentIndex: 0,
        // currentPositionY: 0
      }
    },
    methods: {
      ...mapActions(['addShopCar']),
      imgLoad(){
        //图片加载完后刷新滚动条 (避免还未加载完图片 better-scroll组件已算好高度，导致下拉bug)
        //newRefresh()代码在mixin.js中
        this.newRefresh()
        //图片加载完后计算导航栏各项对应的滚动Y值
        this.detailThemeFunc()

      },
      //点击导航栏跳转到对应位置
      navBarClick(index){
        this.$refs.scroll.scrollTo(0, -this.detailThemeY[index], 500)
      },

      //通过滚动Y值判断导航栏高亮显示位置
      scrollPosition(position){
        const positionY = -position.y
        let length = this.detailThemeY.length
        for(let i =0;i<length;i++){
          if( this.currentIndex !==i && ((i < length -1 && positionY >= this.detailThemeY[i] && positionY < this.detailThemeY[i+1]) ||
            (i == length -1 && positionY >= this.detailThemeY[i]))){
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }

        //判断是否显示返回顶部的按钮
        this.isShowBackTop = positionY > BACKTOP_DISTANCE
      },
      addCart(){
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.swiperImg[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.iid;
        // product.count = 0
        this.addShopCar(product).then(res => {
          this.$toast.show(res, 2000)
        })

      }
    },
    mixins: [goodsImgListenerMixin, backToTop],
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetailInfo(this.iid).then(res =>{
        //获取轮播图数据
        console.log(res);
        const data = res.data.result;
        this.swiperImg = data.itemInfo.topImages;

        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns, data.shopInfo.services)
        //获取店家信息
        this.shopInfo = data.shopInfo
        //获取商品展示信息
        this.detailInfo = data.detailInfo
        //获取商品参数信息
        this.paramInfo = data.itemParams
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })

      //3.获取详情数据
      getRecommend().then(res =>{
        this.recommendInfo = res.data.data.list
      })

      //导航栏点击后保存滚动Y值的方法
      this.detailThemeFunc = debounce(() => {
        this.detailThemeY.push(0)
        this.detailThemeY.push(this.$refs.param.$el.offsetTop - 44)
        this.detailThemeY.push(this.$refs.comment.$el.offsetTop - 44)
        this.detailThemeY.push(this.$refs.recommend.$el.offsetTop - 44)
        console.log(this.detailThemeY);
      },500)



    },
    mounted() {

    },
    destroyed(){
      //销毁监听的商品图片加载事件
      this.$bus.$off('goodsImgLoad', this.goodsImgListener)
    }
  }
</script>

<style scoped>
  .detail{
    position: relative;
    height: 100vh;
    background-color: #fff;
    z-index: 1;
  }
  .content{
    background-color: #ffff;
    height: calc(100% - 44px);
  }
</style>
