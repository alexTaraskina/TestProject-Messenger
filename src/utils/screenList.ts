import { BlockClass } from 'core';
import { ErrorPage } from 'pages/error-page';
import { Error404 } from 'pages/404';
import { ChoseChat } from 'pages/chose-chat';
import { Login } from 'pages/login';
import { Profile } from 'pages/profile';
import { SignIn } from 'pages/signin';
import { ProfileEdit } from 'pages/profile-edit';
import { PasswordEdit } from 'pages/password-edit';
import { ChatPage } from 'pages/chat';

export enum Screens {
    ErrorPage = 'error',
    Error404 = '404',
    Profile = 'profile',
    ProfileEdit = 'profile-edit',
    PasswordEdit = 'password-edit',
    Chats = 'messenger',
    Chat = "chat",
    Login = 'login',
    Register = 'signup',
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.ErrorPage]: ErrorPage,
    [Screens.Error404]: Error404,
    [Screens.Chats]: ChoseChat,
    [Screens.Chat]: ChatPage,
    [Screens.Profile]: Profile,
    [Screens.ProfileEdit]: ProfileEdit,
    [Screens.PasswordEdit]: PasswordEdit,
    [Screens.Login]: Login,
    [Screens.Register]: SignIn,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
    return map[screen];
};
