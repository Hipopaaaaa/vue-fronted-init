import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

// 登陆参数
export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface LoginRes {
  id: number;
  username: string;
  userAccount: string;
  avatarUrl: string;
  gender: number;
  phone: string;
  email: string;
  userRole: number;
  userStatus: number;
  createTime: Date;
}
// 注册参数
export interface RegisterData {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
  phone: string;
}
export interface RegisterRes {
  id: number;
}

// 忘记密码参数
export interface ForgetData {
  userAccount: string;
  userPassword: string;
  phone: string;
}
export interface ForgetRes {
  id: number;
}

// 获取用户列表参数
export interface SearchData {
  username: string;
  current: number;
  pageSize: number;
}
export interface SearchRes {
  id: number;
  username: string;
  userAccount: string;
  avatarUrl: string;
  gender: number;
  phone: string;
  email: string;
  userRole: number;
  userStatus: number;
  createTime: Date;
}

// // 删除用户参数
export interface DeleteData {
  id: number;
}
export interface DeleteRes {
  res: number;
}

// // 修改用户参数
export interface UpdateData {
  id: number;
  username: string;
  phone: string;
  email: string;
  userRole: number;
  userStatus: number;
}
export interface UpdateRes {
  id: number;
  username: string;
  userAccount: string;
  avatarUrl: string;
  gender: number;
  phone: string;
  email: string;
  userRole: number;
  userStatus: number;
  createTime: Date;
}

// 登陆接口
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

// 注册接口
export function register(data: RegisterData) {
  return axios.post<RegisterRes>('/api/user/register', data);
}

// 忘记密码接口
export function forget(data: ForgetData) {
  return axios.post<ForgetRes>('/api/user/forget', data);
}

// 注销接口
export function logout() {
  return axios.post('/api/user/logout');
}

// 获取用户信息接口
export function getUserInfo() {
  return axios.get<UserState>('/api/user/current');
}

// 获取用户列表接口
export function getUserList(data: SearchData) {
  return axios.get<SearchRes>(`/api/user/search?username=${data}`);
}
// 获取分页用户列表接口
export function getUserListByPage(data: SearchData) {
  return axios.post<SearchRes>(`/api/user/list/page`, data);
}

// 删除用户接口
export function deleteUser(data: DeleteData) {
  return axios.post<DeleteRes>(`/api/user/delete?id=${data}`);
}
// 修改用户接口
export function updateUser(data: UpdateData) {
  return axios.post<UpdateRes>('/api/user/update', data);
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
