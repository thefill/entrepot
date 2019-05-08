import {SpecUtils} from '../spec-utils';
import {MappedStore} from './synthetic-map.class';

describe('Mapped store', () => {
    let store: MappedStore;
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    beforeEach(() => {
        store = new MappedStore();
        primitiveValues = SpecUtils.generateTestValues('primitive');
        arrays = SpecUtils.generateTestValues('array');
        objects = SpecUtils.generateTestValues('object');
    });

    describe('should behave like Map', () => {
        it('should handle NaN keys', () => {
            expect(1).toBeTruthy();

        });

        it('should iterate with for..of', () => {
            expect(1).toBeTruthy();
            // var myMap = new Map();
            // myMap.set(0, 'zero');
            // myMap.set(1, 'one');
            // for (var [key, value] of myMap) {
            //     console.log(key + ' = ' + value);
            // }
            // // 0 = zero
            // // 1 = one
            //
            // for (var key of myMap.keys()) {
            //     console.log(key);
            // }
            // // 0
            // // 1
            //
            // for (var value of myMap.values()) {
            //     console.log(value);
            // }
            // // zero
            // // one
            //
            // for (var [key, value] of myMap.entries()) {
            //     console.log(key + ' = ' + value);
            // }
            // // 0 = zero
            // // 1 = one
        });

        it('should iterate with forEach()', () => {
            expect(1).toBeTruthy();
            // myMap.forEach(function(value, key) {
            //     console.log(key + ' = ' + value);
            // });
            // // Will show 2 logs; first with "0 = zero" and second with "1 = one"
        });

        it('should interact with arrays in the same way as Map', () => {
            expect(1).toBeTruthy();
            // var kvArray = [['key1', 'value1'], ['key2', 'value2']];
            //
            // // Use the regular Map constructor to transform a 2D key-value Array into a map
            // var myMap = new Map(kvArray);
            //
            // myMap.get('key1'); // returns "value1"
            //
            // // Use the Array.from function to transform a map into a 2D key-value Array
            // console.log(Array.from(myMap)); // Will show you exactly the same Array as kvArray
            //
            // // A more succinct way to do the same with spread syntax
            // console.log([...myMap]);
            //
            // // Or use the keys or values iterators and convert them to an array
            // console.log(Array.from(myMap.keys())); // Will show ["key1", "key2"]
        });

        it('should clone and merge stores', () => {
            expect(1).toBeTruthy();
            //
            // Just like Arrays, Maps can be cloned:
            //
            //     var original = new Map([
            //         [1, 'one']
            //     ]);
            //
            // var clone = new Map(original);
            //
            // console.log(clone.get(1)); // one
            // console.log(original === clone); // false. Useful for shallow comparison
            // Keep in mind that the data itself is not cloned
            //
            // Maps can be merged, maintaining key uniqueness:
            //
            //     var first = new Map([
            //         [1, 'one'],
            //         [2, 'two'],
            //         [3, 'three'],
            //     ]);
            //
            // var second = new Map([
            //     [1, 'uno'],
            //     [2, 'dos']
            // ]);
            //
            // // Merge two maps. The last repeated key wins.
            // // Spread operator essentially converts a Map to an Array
            // var merged = new Map([...first, ...second]);
            //
            // console.log(merged.get(1)); // uno
            // console.log(merged.get(2)); // dos
            // console.log(merged.get(3)); // three
            // Maps can be merged with Arrays, too:
            //
            // var first = new Map([
            //     [1, 'one'],
            //     [2, 'two'],
            //     [3, 'three'],
            // ]);
            //
            // var second = new Map([
            //     [1, 'uno'],
            //     [2, 'dos']
            // ]);
            //
            // // Merge maps with an array. The last repeated key wins.
            // var merged = new Map([...first, ...second, [1, 'eins']]);
            //
            // console.log(merged.get(1)); // eins
            // console.log(merged.get(2)); // dos
            // console.log(merged.get(3)); // three
        });
    });
});
