import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'



export const goodsImgListenerMixin = {
  data(){
    return{
      goodsImgListener: null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.goodsImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('goodsImgOnload',this.goodsImgListener)
  },
}

export const backToTop = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: null
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500);
      this.$refs.scroll.refresh();
    },

  }

}
