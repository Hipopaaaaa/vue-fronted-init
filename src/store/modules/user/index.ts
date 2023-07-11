import { defineStore } from 'pinia';
import {
  login as userLogin,
  register as userRegister,
  forget as userForget,
  logout as userLogout,
  getUserInfo,
  LoginData,
  RegisterData,
  ForgetData,
  SearchData,
  getUserList,
  deleteUser,
  UpdateData,
  updateUser,
  getUserListByPage,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { Message } from '@arco-design/web-vue';

import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    username: undefined,
    useAccount: undefined,
    avatarUrl: undefined,
    phone: undefined,
    gender: undefined,
    email: undefined,
    userRole: undefined,
    userStatus: undefined,
    createTime: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.userRole === 1 ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res: UserState = await getUserInfo();
      this.setInfo(res);
      return res;
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        // 记录用户信息
        setToken(JSON.stringify(res));
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // Register
    async register(loginForm: RegisterData) {
      try {
        const res: number = await userRegister(loginForm);
        if (res > 0) {
          Message.success('注册成功');
        }
        // setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // Search
    async getUserList(username: SearchData) {
      try {
        const res = await getUserList(username);
        return res;
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // Search
    async getUserListByPage(pageObj: SearchData) {
      try {
        const res = await getUserListByPage(pageObj);
        return res;
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // Delete
    async deleteUser(userId: SearchData) {
      try {
        const res: number = await deleteUser(userId);
        if (res <= 0) {
          throw Message.error('删除失败');
        } else {
          Message.success('删除成功');
        }
        return res;
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // Update
    async updateUser(user: UpdateData) {
      try {
        const res = await updateUser(user);
        if (res) {
          Message.success('修改成功');
        }
        return res;
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // Forget
    async forget(loginForm: ForgetData) {
      try {
        await userForget(loginForm);
        // setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
