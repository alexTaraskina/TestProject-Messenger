import { BlockClass } from 'core';
import { Error404 } from 'pages/404';
import { Error500 } from 'pages/500';
import { ChoseChat } from 'pages/chose-chat';
import { Login } from 'pages/login';
import { Main } from 'pages/main';
import { Profile } from 'pages/profile';
import { SignIn } from 'pages/signin';
import { ProfileEdit } from 'pages/profile-edit';

export enum Screens {
    Error404 = '404',
    Error500 = '500',
    Profile = 'profile',
    ProfileEdit = 'profile-edit',
    Chats = 'messenger',
    Login = 'login',
    Register = 'signup',
    Main = 'main'
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.Error404]: Error404,
    [Screens.Error500]: Error500,
    [Screens.Chats]: ChoseChat,
    [Screens.Profile]: Profile,
    [Screens.ProfileEdit]: ProfileEdit,
    [Screens.Login]: Login,
    [Screens.Register]: SignIn,
    [Screens.Main]: Main,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
    return map[screen];
};
