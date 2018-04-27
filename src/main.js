import Vue from 'vue'
import App from './App'
import store from'./store'
import router from './router'
import lazyload from 'vue-lazyload'



Vue.config.productionTip = false
		Vue.use(lazyload,{
			loading: require('common/image/default.png')
		})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
