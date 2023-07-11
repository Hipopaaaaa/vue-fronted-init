// const TOKEN_KEY = 'token';

// const isLogin = () => {
//   return !!localStorage.getItem(TOKEN_KEY);
//   //return true;
// };
//
// const getToken = () => {
//   return localStorage.getItem(TOKEN_KEY);
// };
//
// const setToken = (token: string) => {
//   localStorage.setItem(TOKEN_KEY, token);
// };
//
// const clearToken = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };
//
// export { isLogin, getToken, setToken, clearToken };

const USER_KEY = 'user';
const isLogin = () => {
  return !!localStorage.getItem(USER_KEY);
  // return true;
};

const getToken = () => {
  return localStorage.getItem(USER_KEY);
};

const setToken = (user: string) => {
  localStorage.setItem(USER_KEY, user);
};

const clearToken = () => {
  localStorage.removeItem(USER_KEY);
};

export { isLogin, getToken, setToken, clearToken };
