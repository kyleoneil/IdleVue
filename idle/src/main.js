import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import routes from './router/routes'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
});
new Vue({
  routes,
  vuetify,
  render: h => h(App),
  router:router,
}).$mount('#app')
