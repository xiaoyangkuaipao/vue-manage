// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import md5 from 'js-md5'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import '../static/iconfont/iconfont.css'
import './less/app.less'

Vue.config.productionTip = false
Vue.prototype.md5 = md5;

Vue.use(ElementUI)
Vue.use(VueResource)

/* eslint-disable no-new */
const self = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.http.interceptors.push((request, next) => {
  const loading = self.$loading({
    fullscreen: true,
    lock: true,
    customClass: 'my-loading',
    text: '加载中',
  });

  next(response => {
    loading.close();
    if(response.body.status == '9') {
      router.push('/login');
      self.$message.error('您还未登录系统！');
    }
    return response
  })
})
