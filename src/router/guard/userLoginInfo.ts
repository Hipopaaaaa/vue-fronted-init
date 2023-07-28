import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { clearToken, isLogin } from '@/utils/auth';

export default function setupUserLoginInfoGuard(router: Router) {
  // 不需要登陆就能访问的页面
  const whiteList: string[] = ['register', 'login', 'forget'];
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (isLogin()) {
      if (userStore.role) {
        next();
      } else {
        try {
          const res = await userStore.info();
          if (!res) {
            clearToken();
            router.push({
              name: 'login',
            });
          }
          next();
        } catch (error) {
          await userStore.logout();
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
        }
      }
    } else if (whiteList.includes(<string>to.name)) {
      next();
    } else {
      if (to.name === 'login') {
        next();
        return;
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
    // next();
  });
}
