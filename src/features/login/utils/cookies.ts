import { User } from './auth';

const COOKIE_NAME = 'auth_user';
const COOKIE_EXPIRES_DAYS = 7;

export const setAuthCookie = (user: User): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000));
  
  const cookieValue = JSON.stringify(user);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(cookieValue)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
};

export const getAuthCookie = (): User | null => {
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => cookie.trim().startsWith(`${COOKIE_NAME}=`));
  
  if (!authCookie) {
    return null;
  }
  
  try {
    const cookieValue = authCookie.split('=')[1];
    const decodedValue = decodeURIComponent(cookieValue);
    return JSON.parse(decodedValue) as User;
  } catch (error) {
    console.error('Error parsing auth cookie:', error);
    return null;
  }
};

export const clearAuthCookie = (): void => {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
