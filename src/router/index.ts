import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach(async (_to, _from, next) => {
  next();
});

export default router;
