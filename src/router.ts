import { Store, renderDOM, CoreRouter } from 'core';
import { getScreenComponent, Screens } from './utils';

const routes = [
    {
        path: '/login',
        block: Screens.Login,
        shouldAuthorized: false,
    },
    {
        path: '*',
        block: Screens.Login,
        shouldAuthorized: false,
    },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
    routes.forEach(route => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);

            if (isAuthorized || !route.shouldAuthorized) {
                store.dispatch({ screen: route.block });
                return;
            }

            if (!currentScreen) {
                store.dispatch({ screen: Screens.Login });
            }
        });
    });

    store.on('changed', (prevState, nextState) => {
        if (!prevState.appIsInited && nextState.appIsInited) {
            router.start();
        }

        if (prevState.screen !== nextState.screen) {
            const Page = getScreenComponent(nextState.screen);
            renderDOM(new Page({}));
            document.title = `App / ${Page.componentName}`;
        }
    });
}
