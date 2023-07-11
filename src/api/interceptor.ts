import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';

// 对接后端的通用返回类
export interface HttpResponse<T = unknown> {
  description: string;
  msg: string;
  code: number;
  data: T;
}
// 设置默认后端请求路径
if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message.error({
        content: res.description || 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (
      //   [50008, 50012, 50014].includes(res.code) &&
      //   response.config.url !== '/api/user/info'
      // ) {
      //   Modal.error({
      //     title: 'Confirm logout',
      //     content:
      //       'You have been logged out, you can cancel to stay on this page, or log in again',
      //     okText: 'Re-Login',
      //     async onOk() {
      //       const userStore = useUserStore();
      //
      //       await userStore.logout();
      //       window.location.reload();
      //     },
      //   });
      // }
      return Promise.reject(new Error(res.description || 'Error'));
    }
    return res.data;
  }
  // (error) => {
  //   Message.error({
  //     content: error.msg || 'Request Error',
  //     duration: 5 * 1000,
  //   });
  //   return Promise.reject(error);
  // }
);
