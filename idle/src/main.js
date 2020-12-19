import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import routes from './router/routes'
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode:'history'
});

new Vue({
  el:'#app',
  vuetify,
  axios,
  render: h => h(App),
  router:router,
}).$mount('#app')
