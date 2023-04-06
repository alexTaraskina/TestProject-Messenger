import { expect } from 'chai';
// eslint-disable-next-line
import sinon from 'sinon';
import HTTPTransport from './HTTPTransort';

describe('HTTPTransport class', () => {
    let requests: sinon.SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        const XHR = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = XHR;

        XHR.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    afterEach(() => {
        requests = [];
    });

    it('should call GET method', () => {
        // arrange
        const transport = new HTTPTransport();

        // act
        transport.get('/');

        // assert
        expect(requests[0].method.toUpperCase()).to.eq('GET');
    });
});
