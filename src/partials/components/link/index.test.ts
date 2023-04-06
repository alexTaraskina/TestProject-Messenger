// eslint-disable-next-line
import * as sinon from 'sinon';
import { expect } from 'chai';
import { CoreRouter } from '../../../core';
import { Link } from './link';

describe('Link component', () => {
    const router = {} as CoreRouter;
    const callback = sinon.stub();

    beforeEach(() => {
        callback.reset();
    });

    it('should render', () => {
        // eslint-disable-next-line
        new Link({ router, onClick: callback });
    });

    it('should call callback function on click', () => {
        // @ts-ignore
        const link = new Link({ onClick: callback });

        link.element?.click();

        expect(callback.called).to.eq(true);
    });
});
