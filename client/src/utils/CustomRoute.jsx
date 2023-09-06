import { Navigate } from 'react-router-dom';
import { isLogin } from './isLogin';

export const PrivateRoute = ({ children }) => {
  if (isLogin() === true) {
    return <>{children}</>;
  } else {
    console.log('login Please');
    return <Navigate to="/" />;
  }
};
