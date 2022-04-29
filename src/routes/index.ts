import {createRouter, createWebHashHistory} from 'vue-router';

// route list
const routes = [
  {
    path: '/',
    component: ()=>import('views/home/HomeIndex.vue'),
  },
];

// instantiation vue-router
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from, next)=>{
  // Write some in here
  next();
});

export default router;
