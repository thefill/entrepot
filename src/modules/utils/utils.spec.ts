import {UtilsClass} from './utils.class';

describe('Utils', () => {
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    beforeEach(() => {
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    });

    describe('should not change values of', () => {
        it('primitive values', () => {
            primitiveValues.forEach((value) => {
                const processed = UtilsClass.decoupleValue(value);
                expect(processed).toEqual(value);
            });
        });
        it('arrays with values', () => {
            arrays.forEach((value) => {
                const processed = UtilsClass.decoupleValue(value);
                expect(processed).toEqual(value);
            });
        });
        it('objects', () => {
            objects.forEach((value) => {
                const processed = UtilsClass.decoupleValue(value);
                expect(processed).toEqual(value);
            });
        });
    });
    describe('should decauple', () => {
        it('arrays with values', () => {
            arrays.forEach((value) => {
                const processed = UtilsClass.decoupleValue(value);
                expect(processed === value).not.toBeTruthy();
            });
        });
        it('objects', () => {
            objects.forEach((value) => {
                const processed = UtilsClass.decoupleValue(value);
                expect(processed === value).not.toBeTruthy();
            });
        });
    });
});

/**
 * Generate set of values for provided types
 * @returns {any}
 */
export function generateTestValues(type: 'primitive' | 'array' | 'object'): any {
    let value: any;

    switch (type) {
        case 'primitive':
            value = [
                123,
                'string'
            ];
            break;
        case 'array':
            value = [
                [1, 2, 3],
                ['a', 'b', 'c'],
                [{a: 1, b: 2}, {c: 1, d: 2}],
                [[1, 2, 3], ['a', 'b', 'c']]
            ];
            break;
        case 'object':
            value = [
                {a: 1, b: 2},
                {c: 1, d: 2},
                {e: {a: 1, b: 2}, f: {c: 1, d: 2}}
            ];
            break;
    }

    return value;
}
