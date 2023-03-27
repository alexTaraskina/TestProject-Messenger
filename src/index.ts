import './styles/styles.css';

import { registerComponent, CoreRouter, Store, PathRouter } from './core';
import { initApp } from './services/initApp';
import { defaultState } from './store';
import { initRouter } from './router';

import { Link } from './partials/components/link';
import { Button } from './partials/components/button';
import { Input } from 'partials/components/input';
import { FormError } from 'partials/components/form-error';
import { FormInputGroup } from './partials/components/form-input-group';
import { Option } from './partials/components/option';
import { KeyValueLine } from './partials/components/key-value-line';
import { Avatar } from 'partials/components/avatar';
import { NavButton } from 'partials/components/nav-button';
import { Backdrop } from 'partials/components/backdrop';
import { SendMessageButton } from 'partials/components/send-message-button';
import { ActionsButton } from 'partials/modules/action-button';
import { ChatImage } from 'partials/components/chat-image';

import { LoginForm } from './partials/modules/login-form';
import { RegisterForm } from './partials/modules/register-form';
import { Chats } from './partials/modules/chats';
import { Message } from './partials/modules/message';
import { ChatArea } from './partials/modules/chat-area';
import { Error } from './partials/modules/error';
import { Searchbox } from './partials/modules/searchbox';
import { ChatPreview } from './partials/modules/chat-preview';
import { ChatsList } from 'partials/modules/chats-list';
import { ProfileCard } from './partials/modules/profile-card';
import { ProfileEditForm } from 'partials/modules/profile-edit-form';
import { PasswordEditForm } from 'partials/modules/password-edit-form';
import { Modal } from './partials/modules/modal';

import { Login } from './pages/login';

registerComponent(Link);
registerComponent(Button);
registerComponent(Input);
registerComponent(FormError);
registerComponent(FormInputGroup);
registerComponent(Option);
registerComponent(KeyValueLine);
registerComponent(Avatar);
registerComponent(NavButton);
registerComponent(Backdrop);
registerComponent(SendMessageButton);
registerComponent(ActionsButton);
registerComponent(ChatImage);

registerComponent(LoginForm);
registerComponent(RegisterForm);
registerComponent(Chats);
registerComponent(Message);
registerComponent(ChatArea);
registerComponent(Error);
registerComponent(Searchbox);
registerComponent(ChatPreview);
registerComponent(ChatsList);
registerComponent(ProfileCard);
registerComponent(ProfileEditForm);
registerComponent(PasswordEditForm);
registerComponent(Modal);

registerComponent(Login);

declare global {
    interface Window {
        store: Store<AppState>;
        router: CoreRouter;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const store = new Store<AppState>(defaultState);
    const router = new PathRouter();

    window.router = router;
    window.store = store;

    store.on('changed', (prevState, nextState) => {
        if (process.env.DEBUG) {
            console.log(
                '%cstore updated',
                'background: #222; color: #bada55',
                nextState,
            );
        }
    });

    initRouter(router, store);

    /**
     * Загружаем данные для приложения
     */
    store.dispatch(initApp);
});
