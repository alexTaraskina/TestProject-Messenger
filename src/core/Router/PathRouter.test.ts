import { expect } from 'chai';
// eslint-disable-next-line
import * as sinon from 'sinon';
import { PathRouter } from './PathRouter';

describe('PathRouter', () => {
    const originalBack = global.window.history.back;
    const originalForward = global.window.history.forward;

    const callback = sinon.stub();

    before(() => {
        global.window.history.back = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
            }
        };
        global.window.history.forward = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
            }
        };
    });

    after(() => {
        global.window.history.back = originalBack;
        global.window.history.forward = originalForward;
    });

    beforeEach(() => {
        callback.reset();
    });

    it('use() should return Router instance', () => {
        const router = new PathRouter();

        const result = router.use('/', callback);

        expect(result).to.eq(router);
    });

    it('should render a page on history back action', () => {
        const router = new PathRouter();

        router.use('/', callback).start();
        router.back();

        expect(callback.called).to.eq(true);
    });
});
