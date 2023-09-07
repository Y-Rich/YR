import Home from './view/pages/home/Home';
import UserModi from './view/pages/user/UserModi';
import Find from './view/pages/user/Find';
import PLC from './view/pages/3d/Edukit';
import Register from './view/pages/user/Register';
import Admin from './view/pages/admin/Admin';
import Chart from './view/pages/chart/Chart';

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
  PLC: {
    path: '/plc',
    element: PLC,
  },
  Simple: {
    path: '/chart',
    element: Chart,
  },
};
export const PUBLIC_ROUTE = {
  Simple: {
    path: '/chart',
    element: Chart,
  },
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
  Simple: {
    path: '/chart',
    element: Chart,
  },
  USERMODI: {
    path: '/usermodi',
    element: UserModi,
  },
  ADMIN: {
    path: '/admin',
    element: Admin,
  },
  PLC: {
    path: '/plc',
    element: PLC,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
