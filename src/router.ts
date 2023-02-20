import { Store, renderDOM, CoreRouter } from 'core';
import { getScreenComponent, Screens } from './utils';

const routes = [
    {
        path: '/sign-up',
        block: Screens.Register,
        shouldAuthorized: false,
    },
    {
        path: '/login',
        block: Screens.Login,
        shouldAuthorized: false,
    },
    {
        path: '/404',
        block: Screens.Error404,
        shouldAuthorized: false,
    },
    {
        path: '/500',
        block: Screens.Error500,
        shouldAuthorized: false,
    },
    {
        path: '/messenger',
        block: Screens.Chats,
        shouldAuthorized: true,
    },
    {
        path: '/messenger/:id',
        block: Screens.Chat,
        shouldAuthorized: true,
    },
    {
        path: '/profile',
        block: Screens.Profile,
        shouldAuthorized: true,
    },
    {
        path: '/profile-edit',
        block: Screens.ProfileEdit,
        shouldAuthorized: true,
    },
    {
        path: '/password-edit',
        block: Screens.PasswordEdit,
        shouldAuthorized: true,
    },
    {
        path: '*',
        block: Screens.Login,
        shouldAuthorized: false,
    },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
    routes.forEach(route => {
        router.use(route.path, (params) => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);

            if (isAuthorized && (route.block === Screens.Login || route.block === Screens.Register)) {
                router.go('/messenger');
                return;
            }

            if (isAuthorized || !route.shouldAuthorized) {
                store.dispatch({ screen: route.block, params });
                return;
            }

            if (!currentScreen) {
                store.dispatch({ screen: Screens.Login, params });
            }
        });
    });

    store.on('changed', (prevState, nextState) => {
        if (!prevState.appIsInited && nextState.appIsInited) {
            router.start();
        }

        if (prevState.screen !== nextState.screen) {
            const Page = getScreenComponent(nextState.screen);
            renderDOM(new Page({ params: nextState.params }));
            document.title = `App / ${Page.componentName}`;
        }
    });
}
