import './styles/styles.css';

import { renderDOM, registerComponent, CoreRouter, Store } from  './core';
import { defaultState } from './store';
import { initRouter } from './router';

import { Link } from './partials/components/link';
import { Button } from './partials/components/button';
import { Input } from 'partials/components/input';
import { FormError } from 'partials/components/form-error';
import { FormInputGroup } from './partials/components/form-input-group';
import { FileTypeOption } from './partials/components/file-type-option';
import { KeyValueLine } from './partials/components/key-value-line';

import { LoginForm } from './partials/modules/login-form';
import { RegisterForm } from './partials/modules/register-form';
import { Chats } from './partials/modules/chats';
import { Message } from './partials/modules/message';
import { ChatArea } from './partials/modules/chat-area';
import { Error } from './partials/modules/error';
import { Searchbox } from './partials/modules/searchbox';
import { ChatPreview } from './partials/modules/chat-preview';
import { ProfileCard } from './partials/modules/profile-card';
import { Modal } from './partials/modules/modal';

import { Login } from './pages/login';
import { Error404 } from './pages/404';
import { Error500 } from './pages/500';
import { SignIn } from './pages/signin';
import { ChoseChat } from './pages/chose-chat';
import { Chat } from './pages/chat';
import { Profile } from './pages/profile';
import { Modals } from './pages/modals';
import { Main } from './pages/main';

registerComponent(Link);
registerComponent(Button);
registerComponent(Input);
registerComponent(FormError);
registerComponent(FormInputGroup);
registerComponent(FileTypeOption);
registerComponent(KeyValueLine);

registerComponent(LoginForm);
registerComponent(RegisterForm);
registerComponent(Chats);
registerComponent(Message);
registerComponent(ChatArea);
registerComponent(Error);
registerComponent(Searchbox);
registerComponent(ChatPreview);
registerComponent(ProfileCard);
registerComponent(Modal);

registerComponent(Login);
registerComponent(Error404);
registerComponent(Error500);
registerComponent(SignIn);
registerComponent(ChoseChat);
registerComponent(Chat);
registerComponent(Profile);
registerComponent(Modals);
registerComponent(Main);

declare global {
    interface Window {
        store: Store<AppState>;
        router: CoreRouter;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const store = new Store<AppState>(defaultState);

    // if (window.location.pathname === '/login') {
    //     renderDOM(new Login());
    // }
    // else if (window.location.pathname === '/404') {
    //     renderDOM(new Error404());
    // }
    // else if (window.location.pathname === '/500') {
    //     renderDOM(new Error500());
    // }
    // else if (window.location.pathname === '/signin') {
    //     renderDOM(new SignIn());
    // }
    // else if (window.location.pathname === '/chose-chat') {
    //     renderDOM(new ChoseChat());
    // }
    // else if (window.location.pathname === '/chat') {
    //     renderDOM(new Chat());
    // }
    // else if (window.location.pathname === '/profile') {
    //     renderDOM(new Profile());
    // }
    // else if (window.location.pathname === '/modals') {
    //     renderDOM(new Modals());
    // }
    // else {
    //     renderDOM(new Main());
    // }
});
