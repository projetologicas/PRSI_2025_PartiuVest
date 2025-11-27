import Cookies from 'js-cookie';

// Setting a cookie
export const setTokenCookie = (token: string, expiresDays: number) => {
  Cookies.set('accessToken', token, { expires: expiresDays, secure: true, sameSite: 'Lax' });
};

// Getting a cookie
export const getTokenCookie = (): string | undefined => {
  return Cookies.get('accessToken');
};

// Removing a cookie
export const removeTokenCookie = () => {
  Cookies.remove('accessToken');
};