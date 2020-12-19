// import Vue from 'vue'
// import VueRouter from 'vue-router'
import login from '../views/Login';
import queuelist from '../views/QueueList';
import manageBusiness from '../views/ManageBusiness';
// Vue.use(VueRouter);

export default[
    {path:'/login',component: login},
    {path:'/queueList',component: queuelist},
    {path:'/business', component: manageBusiness},
] 