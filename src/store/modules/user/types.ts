export type RoleType = '' | '*' | 'admin' | 'user';
// 框架原始数据
// export interface UserState {
//   name?: string;
//   avatar?: string;
//   job?: string;
//   organization?: string;
//   location?: string;
//   email?: string;
//   introduction?: string;
//   personalWebsite?: string;
//   jobName?: string;
//   organizationName?: string;
//   locationName?: string;
//   phone?: string;
//   registrationDate?: string;
//   accountId?: string;
//   certification?: number;
//   role: RoleType;
// }

export interface UserState {
  id?: number;
  username?: string;
  useAccount?: string;
  avatarUrl?: string;
  phone?: string;
  gender?: number;
  email?: string;
  userRole?: number;
  userStatus?: number;
  createTime?: Date;
  role: RoleType;
}
