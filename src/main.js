import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
//添加时间总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//安装lazyload
Vue.use(VueLazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
