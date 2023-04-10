import { expect } from 'chai';
import { isEqual } from './isEqual';

describe('isEqual helper', () => {
    it('should return `false` in case two objects have different keys count', () => {
        // arrange
        const objFist = { a: 'a' };
        const objSecond = { a: 'a', b: 'b' };

        // act
        const result = isEqual(objFist, objSecond);

        // assert
        expect(result).to.eq(false);
    });

    it('should work with nested objects', () => {
        const objFist = {
            a: 'a',
            b: {
                c: 'c',
                d: 'd',
            },
        };

        const objSecond = {
            a: 'a',
            b: {
                c: 'c',
                d: 'd',
            },
        };

        const result = isEqual(objFist, objSecond);

        expect(result).to.eq(true);
    });

    it('should work with arrays', () => {
        // arrange
        const fist = ['a', 'b', 'c'];
        const second = ['a', 'b', 'c'];

        // act
        const result = isEqual(fist, second);

        // assert
        expect(result).to.eq(true);
    });
});
