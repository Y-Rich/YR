import Home from './view/pages/home/Home';
import UserModi from './view/pages/user/UserModi';
import Password from './view/pages/user/Password';
import Register from './view/pages/user/Register';
import Admin from './view/pages/admin/Admin';
import Main from './view/pages/3d/Main';
import EmployeeLog from './view/pages/admin/EmployeeLog';
import FactoryLog from './view/pages/admin/FactoryLog';

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
  PASSWORD: {
    path: '/password',
    element: Password,
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
  PASSWORD: {
    path: '/password',
    element: Password,
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
  EMPLOYEELOG: {
    path: '/employeelog',
    element: EmployeeLog,
  },
  FACTIRYLOG: {
    path: '/factorylog',
    element: FactoryLog,
  },
  MAIN: {
    path: '/main',
    element: Main,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
