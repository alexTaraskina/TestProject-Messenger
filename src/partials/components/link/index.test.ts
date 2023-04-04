//import { expect } from 'chai';
import { CoreRouter } from '../../../core';
import * as sinon from 'sinon';
import { Link } from "./link";

describe('Link component', () => {
    const router = {} as CoreRouter;
    const callback = sinon.stub();

    beforeEach(() => {
        callback.reset();
    });

    it('should render', () => {
        new Link({ router, onClick: callback });
    });

    // it.only('should call callback function on click', () => {
    //     const link = new Link({ onClick: callback });

    //     link.element?.click();

    //     expect(callback.called).to.eq(true);
    // });
});
