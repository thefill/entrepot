import {StoreEntryKeyClass} from '../store-entry-key';
import {StoreEntryKeySubstitute} from './store.interface';
import {Store} from './store.module';
import {generateTestValues} from '../utils/utils.spec';

// TODO: implement tests
describe('Store', () => {
    let store: Store;
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    const keys: { [keyLabel: string]: StoreEntryKeySubstitute } = {
        'string': 'someKey',
        'config object with key': {
            key: 'someKey2'
        },
        'config object with key and namespace': {
            namespace: 'someNamespace',
            key: 'someKey3'
        },
        'config object with string key and existing namespace': {
            namespace: 'someNamespace',
            key: 'someKey4'
        },
        'key object with string default value': new StoreEntryKeyClass('someKey5'),
        'key object with key': new StoreEntryKeyClass({key: 'someKey6'}),
        'key object with key and namespace': new StoreEntryKeyClass(({
            namespace: 'someNamespace2',
            key: 'someKey7'
        })),
        'key object with key and existing namespace': new StoreEntryKeyClass(({
            namespace: 'someNamespace2',
            key: 'someKey8'
        }))
    };

    beforeEach(() => {
        store = new Store();
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    });

    describe('should add', () => {

        describe('single entry', () => {

            // Local assertion callback
            const assertExist = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new Store();
                    store.set(key, value);
                    expect(store.exists(key)).toBeTruthy();
                });
            };

            Object.keys(keys).forEach((keyLabel) => {
                describe(`with primitive value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertExist(primitiveValues, keys[keyLabel]);
                    });
                });

                describe(`with array value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertExist(arrays, keys[keyLabel]);
                    });
                });

                describe(`with object value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertExist(objects, keys[keyLabel]);
                    });
                });

            });
        });

        describe('multiple entries', () => {

            // Local assertion callback
            const assertMultipleExist = (
                values: any[],
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
            ) => {
                values.forEach((value) => {
                    store = new Store();
                    const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                    Object.keys(keyConfigs).forEach((keyLabel) => {
                        sets.push({
                            key: keyConfigs[keyLabel],
                            value: value
                        });
                    });

                    store.set(sets);

                    Object.keys(keyConfigs).forEach((keyLabel) => {
                        expect(store.exists(keyConfigs[keyLabel])).toBeTruthy();
                    });
                });
            };

            it(`with primitive values`, () => {
                assertMultipleExist(primitiveValues, keys);
            });

            it(`with array values`, () => {
                assertMultipleExist(arrays, keys);
            });

            it(`with object values`, () => {
                assertMultipleExist(objects, keys);
            });

            it(`with various type of values`, () => {
                const mixedValues = [
                    ...primitiveValues,
                    ...arrays,
                    ...objects
                ];
                assertMultipleExist(mixedValues, keys);
            });

        });

    });

    describe('should return key object when setting', () => {

        describe('single entry', () => {

            // Local assertion callback
            const assertReturnedKey = (values: any[], key: StoreEntryKeySubstitute) => {
                // TODO: implement
                values.forEach((value) => {
                    store = new Store();
                    const returnedKey = store.set(key, value);
                    expect(returnedKey instanceof StoreEntryKeyClass).toBeTruthy();
                });
            };

            Object.keys(keys).forEach((keyLabel) => {

                describe(`with primitive value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertReturnedKey(primitiveValues, keys[keyLabel]);
                    });
                });

                describe(`with array value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertReturnedKey(arrays, keys[keyLabel]);
                    });
                });

                describe(`with object value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertReturnedKey(objects, keys[keyLabel]);
                    });
                });

            });
        });

        describe('multiple entries', () => {

            // Local assertion callback
            const assertMultipleReturnedKeys = (
                values: any[],
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
            ) => {

                values.forEach((value) => {
                    store = new Store();
                    const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                    Object.keys(keyConfigs).forEach((keyLabel) => {
                        sets.push({
                            key: keyConfigs[keyLabel],
                            value: value
                        });
                    });

                    const returnedKeys = store.set(sets) as Array<void | StoreEntryKeyClass>;

                    if (returnedKeys){
                        returnedKeys.forEach((returnedKey) => {
                            expect(returnedKey instanceof StoreEntryKeyClass).toBeTruthy();
                        });
                    } else {
                        expect(Array.isArray(returnedKeys)).toBeTruthy();
                    }
                });
            };

            it(`with primitive values`, () => {
                assertMultipleReturnedKeys(primitiveValues, keys);
            });

            it(`with array values`, () => {
                assertMultipleReturnedKeys(arrays, keys);
            });

            it(`with object values`, () => {
                assertMultipleReturnedKeys(objects, keys);
            });

            it(`with various type of values`, () => {
                const mixedValues = [
                    ...primitiveValues,
                    ...arrays,
                    ...objects
                ];
                assertMultipleReturnedKeys(mixedValues, keys);
            });

        });



        expect(1).toBeTruthy();
        // public set(
        //     key: StoreEntryKeySubstitute | Array<{ key: StoreEntryKeySubstitute, value: T }>,
        //     value?: T
        // ): StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void> {
    });

    it('should retrieve data from the store', () => {
        expect(1).toBeTruthy();
        // public get(
        //     key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
        // ): T | void | Array<T | void> {
    });

    it('should hydrate store with initial values', () => {
        expect(1).toBeTruthy();
        // constructor(initialValues?: Array<{ key: StoreEntryKeySubstitute, value: T }>) {
    });

    it('should check if entry exists', () => {
        expect(1).toBeTruthy();
        // public exists(key: StoreEntryKeyClass): boolean {
        // if exist
        // if not exist
    });

    describe('should reset whole store', () => {
        expect(1).toBeTruthy();
        // public reset(namespace?: StoreEntryKeySubstitute): void {

        it('should erase non-namespace store data', () => {
            expect(1).toBeTruthy();
        });

        it('should erase namespace store data', () => {
            expect(1).toBeTruthy();
        });
    });

    it('should delete data from the store', () => {
        expect(1).toBeTruthy();
        //
        // public delete(
        //     key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
        // ): T | void | Array<T | void> {
    });

    it('should return correct position', () => {
        expect(1).toBeTruthy();
        //public position(
        //         key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
        //     ): number | void | Array<number | void> {
    });
});
