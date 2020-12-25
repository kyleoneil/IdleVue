import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import routes from './router/routes'
import axios from 'axios'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state:{
    count:0,
    role:0,
    token:"",
    id:"",
    showService: false,
    businessid:0,
  },
  mutations: {
    increment (state){
      state.count++
    }
  }
})
//Use sessionStorage.clear(); when user logs out manually.
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

