const token = sessionStorage.getItem('token');
export const isLogin = () => !!sessionStorage.getItem('token');
