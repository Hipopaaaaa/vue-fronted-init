import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '用户管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: '用户列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'editor/:id?/:username?/:phone?/:email?/:userRole?/:userStatus?',
      name: 'Editor',
      component: () =>
        import('@/views/dashboard/workplace/components/editor.vue'),
      meta: {
        locale: '修改用户',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
