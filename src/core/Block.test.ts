// eslint-disable-next-line
import proxyquire from 'proxyquire';
import { expect } from 'chai';
// eslint-disable-next-line
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
    on: sinon.stub(),
    emit: sinon.stub(),
};

const { default: Block } = proxyquire('./Block', {
    './EventBus': {
        default: class {
            emit = eventBusMock.emit;

            on = eventBusMock.on;
        },
    },
}) as { default: typeof BlockType };

describe('Block', () => {
    beforeEach(() => {
        eventBusMock.on.reset();
        eventBusMock.emit.reset();
    });

    class ComponentMock extends Block { }

    it('should fire init event on initialization', () => {
        // eslint-disable-next-line
        new ComponentMock({});
        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });
});
