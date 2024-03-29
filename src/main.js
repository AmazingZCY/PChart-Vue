// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import store from './store';
import VueSocket from 'vue-socket.io';

Vue.prototype.ajax = axios;

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(new VueSocket({
  connection:'http://127.0.0.1:3030',
  // vuex:{
  //   store,
  //   actionPrefix:'SOCKET_',
  //   mutationPrefix:'SOCKET_'
  // }
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h=>h(App)
})
