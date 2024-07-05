import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('/@/views/website.vue'),
  },
  {
    path: '/system/smsServer',
    component: () => import('/@/views/system/smsServer.vue'),
  },
  {
    path: '/:template/:id',
    component: () => import('/@/views/home/index.vue'),
  },
  {
    path: '/:template',
    component: () => import('/@/views/home/index.vue'),
  },
  {
    path: '/download/:app',
    component: () => import('/@/views/download/index.vue'),
  },
  {
    path: '/jxyz/shareGoods',
    component: () => import('/@/views/jxyz/shareGoods.vue'),
  },
];

//  添加路由
const activityList = [
  'smallTV',
  'smallTVHF',
  'smallTVGGN',
  'smallTVJXHH',
  'smallTVJXHH-B',
  'smallTVHF100',
  'calculation',
  'grabCoupon',
  'goldEgg',
];
activityList.forEach((item) => {
  routes.push({
    path: `/activity/${item}/:pageName`,
    component: () => import(`@/views/activity/${item}/index.vue`),
    meta: { notLandingPage: true, wxH5: true, title: item },
  });
});

export default routes;
