import { CoreRouter } from "./CoreRouter";

/**
 * just example for future use, in that project PathRouter is used
 */
export class HashRouter implements CoreRouter {
    private routes: Record<string, Function> = {};

    private isStarted = false;

    start() {
        if (!this.isStarted) {
            this.isStarted = true;
            window.addEventListener('hashchange', () => this.onRouteChange());
            this.onRouteChange();
        }
    }

    onRouteChange() {
        const { hash } = window.location;

        const found = Object.entries(this.routes).some(([routeHash, callback]) => {
            if (routeHash === hash) {
                callback();
                return true;
            }
            return false;
        });

        if (!found && this.routes['*']) {
            this.routes['*']();
        }
    }

    use(hash: string, callback: Function) {
        this.routes[hash] = callback;
        return this;
    }

    go(hash: string) {
        window.location.hash = hash;
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
