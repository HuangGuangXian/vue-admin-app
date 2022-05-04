import Cookies from 'js-cookie';

export function setCookie(userInfo) {
  const arr = Object.entries(userInfo);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

export function getCookie() {
  return {
    username: Cookies.get('username'),
    email: Cookies.get('email'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
  };
}

export function removeCookie() {
  Cookies.remove('username');
  Cookies.remove('email');
  Cookies.remove('appkey');
  Cookies.remove('role');
  return true;
}
