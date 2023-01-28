import { Login } from 'pages/login';
import { BlockClass } from 'core';

export enum Screens {
  Login = 'login',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: Login,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
