import Home from './view/pages/home/Home';
import UserModi from './view/pages/user/UserModi';
import Find from './view/pages/user/Find';
import Register from './view/pages/user/Register';
import Admin from './view/pages/admin/Admin';
import Main from './view/pages/3d/Main';

export const ROUTE = {
  HOME: {
    path: '/',
    element: Home,
  },
  REGISTER: {
    path: '/register',
    element: Register,
  },
  USERMODI: {
    path: '/usermodi',
    element: UserModi,
  },
  FIND: {
    path: '/find',
    element: Find,
  },
};
export const PUBLIC_ROUTE = {
  HOME: {
    path: '/',
    element: Home,
  },
  REGISTER: {
    path: '/register',
    element: Register,
  },
  FIND: {
    path: '/find',
    element: Find,
  },
};
export const PRIVATE_ROUTE = {
  USERMODI: {
    path: '/usermodi',
    element: UserModi,
  },
  ADMIN: {
    path: '/admin',
    element: Admin,
  },
  MAIN: {
    path: '/main',
    element: Main,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
