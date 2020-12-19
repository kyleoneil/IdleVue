import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import routes from './router/routes'
import axios from 'axios'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations: {
    increment (state){
      state.count++
    }
  }
})
const router = new VueRouter({
  routes: routes,
  mode:'history'
});

new Vue({
  data: () => ({
  }),
  el:'#app',
  vuetify,
  axios,
  render: h => h(App),
  router: router,
  store: store,
}).$mount('#app');

export const EventBus = new Vue();

