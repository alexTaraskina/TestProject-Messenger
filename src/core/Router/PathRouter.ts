import { CoreRouter } from "./CoreRouter";

const comparePath = (routeHash: string, pathName: string) => {
    const rHash = routeHash.split('/');
    const pName = pathName.split('/');
    if (rHash.length !== pName.length) {
        return false;
    }

    return rHash.every((piece, index) => {
        if (piece.startsWith(':')) {
            return true;
        }

        return piece === pName[index];
    });
}

const getVariablesFromRoutePath = (routeHash: string, pathName: string): Params => {
    const params: Params = {};
    const rHash = routeHash.split('/');
    const pName = pathName.split('/');
    rHash.forEach((item, index) => {
        if (!item.startsWith(':')) {
            return;
        }

        const variableName = item.substring(1);
        const variableValue = pName[index];
        params[variableName] = variableValue;
    });
    return params;
}

export class PathRouter implements CoreRouter {
    private routes: Record<string, Function> = {};

    private isStarted = false;

    start() {
        if (!this.isStarted) {
            this.isStarted = true;

            window.onpopstate = (event: PopStateEvent) => {
                this.onRouteChange.call(this);
            };

            this.onRouteChange();
        }
    }

    private onRouteChange(pathname: string = window.location.pathname) {
        const found = Object.entries(this.routes).some(([routeHash, callback]) => {
            if (comparePath(routeHash, pathname)) {
                const params = getVariablesFromRoutePath(routeHash, pathname);
                callback(params);
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

    go(pathname: string) {
        window.history.pushState({}, '', pathname);
        this.onRouteChange(pathname);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
