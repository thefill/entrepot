import {UtilsClass} from './utils.class';

describe('Utils', () => {
    let primitiveValues: Array<string | number>;
    let arraysOfValues: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    beforeEach(() => {
        // set values
        primitiveValues = [
            123,
            'string'
        ];
        arraysOfValues = [
            [1, 2, 3],
            ['a', 'b', 'c'],
            [{a: 1, b: 2}, {c: 1, d: 2}],
            [[1, 2, 3], ['a', 'b', 'c']]
        ];
        objects = [
            {a: 1, b: 2},
            {c: 1, d: 2},
            {e: {a: 1, b: 2}, f: {c: 1, d: 2}}
        ];
    });

    describe('should not change values of', () => {
        it('primitive values', () => {
            primitiveValues.forEach((value) => {
                const processed = UtilsClass.decoupleValue(value);
                expect(processed).toEqual(value);
            });
        });
        it('arrays with values', () => {
            arraysOfValues.forEach((value) => {
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
            arraysOfValues.forEach((value) => {
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
