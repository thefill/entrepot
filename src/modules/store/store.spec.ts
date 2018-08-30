import {StoreEntryKeyClass} from '../store-entry-key';
import {generateTestValues} from '../utils/utils.spec';
import {IStoreConfig, IStoreEntryKeyConfig, StoreEntryKeySubstitute} from './store.interface';
import {Store} from './store.module';

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

    });

    describe('should retrieve values', () => {

        describe('single entry value', () => {

            // Local assertion callback
            const assertRetrieval = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new Store();
                    store.set(key, value);
                    const retrievedValue = store.get(key);
                    expect(retrievedValue).toEqual(value);
                });
            };

            Object.keys(keys).forEach((keyLabel) => {

                describe(`primitive value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertRetrieval(primitiveValues, keys[keyLabel]);
                    });
                });

                describe(`array value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertRetrieval(arrays, keys[keyLabel]);
                    });
                });

                describe(`object value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertRetrieval(objects, keys[keyLabel]);
                    });
                });
            });

        });

        describe('multiple entries values', () => {

            // Local assertion callback
            const assertMultipleRetrieval = (
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
                        const retrievedValue = store.get(keyConfigs[keyLabel]);
                        expect(retrievedValue).toEqual(value);
                    });
                });
            };

            it(`with primitive values`, () => {
                assertMultipleRetrieval(primitiveValues, keys);
            });

            it(`with array values`, () => {
                assertMultipleRetrieval(arrays, keys);
            });

            it(`with object values`, () => {
                assertMultipleRetrieval(objects, keys);
            });

            it(`with various type of values`, () => {
                const mixedValues = [
                    ...primitiveValues,
                    ...arrays,
                    ...objects
                ];
                assertMultipleRetrieval(mixedValues, keys);
            });

        });

    });

    describe('should hydrate store with initial values', () => {

        // Local assertion callback
        const assertHydration = (
            values: any[],
            keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
        ) => {
            values.forEach((value) => {
                const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                Object.keys(keyConfigs).forEach((keyLabel) => {
                    sets.push({
                        key: keyConfigs[keyLabel],
                        value: value
                    });
                });

                const storeConfig: IStoreConfig = {
                    initialValues: sets
                };
                store = new Store(storeConfig);

                Object.keys(keyConfigs).forEach((keyLabel) => {
                    const retrievedValue = store.get(keyConfigs[keyLabel]);
                    expect(retrievedValue).toEqual(value);
                });
            });
        };

        it(`with primitive values`, () => {
            assertHydration(primitiveValues, keys);
        });

        it(`with array values`, () => {
            assertHydration(arrays, keys);
        });

        it(`with object values`, () => {
            assertHydration(objects, keys);
        });

        it(`with various type of values`, () => {
            const mixedValues = [
                ...primitiveValues,
                ...arrays,
                ...objects
            ];
            assertHydration(mixedValues, keys);
        });

    });

    describe('should check if entry exists', () => {

        // Local assertion callback
        const assertExistance = (
            values: any[],
            keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
        ) => {
            values.forEach((value) => {
                const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                Object.keys(keyConfigs).forEach((keyLabel) => {
                    sets.push({
                        key: keyConfigs[keyLabel],
                        value: value
                    });
                });

                const storeConfig: IStoreConfig = {
                    initialValues: sets
                };
                store = new Store(storeConfig);

                Object.keys(keyConfigs).forEach((keyLabel) => {
                    expect(store.exists(keyConfigs[keyLabel])).toBeTruthy();
                    store.delete(keyConfigs[keyLabel]);

                    expect(store.exists(keyConfigs[keyLabel])).toBeFalsy();
                });
            });
        };

        it(`with primitive values`, () => {
            assertExistance(primitiveValues, keys);
        });

        it(`with array values`, () => {
            assertExistance(arrays, keys);
        });

        it(`with object values`, () => {
            assertExistance(objects, keys);
        });

        it(`with various type of values`, () => {
            const mixedValues = [
                ...primitiveValues,
                ...arrays,
                ...objects
            ];
            assertExistance(mixedValues, keys);
        });
    });

    describe('should reset whole store', () => {

        it('should erase all data', () => {

            // Local assertion callback
            const values = [
                ...primitiveValues,
                ...arrays,
                ...objects
            ];

            values.forEach((value) => {
                const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                Object.keys(keys).forEach((keyLabel) => {
                    sets.push({
                        key: keys[keyLabel],
                        value: value
                    });
                });

                const storeConfig: IStoreConfig = {
                    initialValues: sets
                };
                store = new Store(storeConfig);
                store.reset();

                Object.keys(keys).forEach((keyLabel) => {
                    expect(store.exists(keys[keyLabel])).toBeFalsy();
                });
            });

        });

        it('should erase namespace store data', () => {

            // Local assertion callback
            const values = [
                ...primitiveValues,
                ...arrays,
                ...objects
            ];
            const namespaceToReset = 'someNamespace';

            values.forEach((value) => {
                const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                Object.keys(keys).forEach((keyLabel) => {
                    sets.push({
                        key: keys[keyLabel],
                        value: value
                    });
                });

                const storeConfig: IStoreConfig = {
                    initialValues: sets
                };
                store = new Store(storeConfig);
                store.reset(namespaceToReset);

                Object.keys(keys).forEach((keyLabel) => {
                    if (typeof keys[keyLabel] !== 'string'){
                        const keyToCheck = keys[keyLabel] as IStoreEntryKeyConfig | StoreEntryKeyClass;
                        if (keyToCheck.namespace === namespaceToReset){
                            expect(store.exists(keys[keyLabel])).toBeFalsy();
                        } else {
                            expect(store.exists(keys[keyLabel])).toBeTruthy();
                        }
                    }
                });
            });

        });
    });

    describe('should delete data from the store and retrieve its value', () => {

        describe('single entry', () => {

            // Local assertion callback
            const assertDeletion = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new Store();
                    store.set(key, value);
                    const retrievedValue = store.delete(key);
                    expect(retrievedValue).toEqual(value);
                    expect(store.exists(key)).toBeFalsy();
                });
            };

            Object.keys(keys).forEach((keyLabel) => {

                describe(`primitive value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertDeletion(primitiveValues, keys[keyLabel]);
                    });
                });

                describe(`array value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertDeletion(arrays, keys[keyLabel]);
                    });
                });

                describe(`object value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertDeletion(objects, keys[keyLabel]);
                    });
                });
            });

        });

        describe('multiple entries', () => {

            // Local assertion callback
            const assertMultipleDeletion = (
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
                        const retrievedValue = store.delete(keyConfigs[keyLabel]);
                        expect(retrievedValue).toEqual(value);
                        expect(store.exists(keyConfigs[keyLabel])).toBeFalsy();
                    });
                });
            };

            it(`with primitive values`, () => {
                assertMultipleDeletion(primitiveValues, keys);
            });

            it(`with array values`, () => {
                assertMultipleDeletion(arrays, keys);
            });

            it(`with object values`, () => {
                assertMultipleDeletion(objects, keys);
            });

            it(`with various type of values`, () => {
                const mixedValues = [
                    ...primitiveValues,
                    ...arrays,
                    ...objects
                ];
                assertMultipleDeletion(mixedValues, keys);
            });

        });

    });

    describe('should return correct position', () => {

        describe('for single entry', () => {

            // Local assertion callback
            const assertPosition = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new Store();
                    for (let i = 0; i < 5; i++) {
                        store.set(key, value);
                        expect(store.position(key)).toEqual(i);
                    }
                });
            };

            Object.keys(keys).forEach((keyLabel) => {
                it(`using ${keyLabel} as an identifier`, () => {
                    // Local assertion callback
                    const mixedValues = [
                        ...primitiveValues,
                        ...arrays,
                        ...objects
                    ];

                    assertPosition(mixedValues, keys[keyLabel]);
                });
            });

        });

        describe('for multiple entries', () => {

            // Local assertion callback
            const assertMultiplePositions = (
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

                    const keysToCheck = sets.map((set) => {
                        return set.key;
                    });

                    for (let i = 0; i < 5; i++) {
                        store.set(sets);

                        const returnedPositions = store.position(keysToCheck) as number[];

                        if (returnedPositions){
                            returnedPositions.forEach((position) => {
                                expect(position).toEqual(i);
                            });
                        } else {
                            expect(Array.isArray(returnedPositions)).toBeTruthy();
                        }
                    }
                });
            };

            it(`using various key types as an identifier`, () => {
                const mixedValues = [
                    ...primitiveValues,
                    ...arrays,
                    ...objects
                ];
                assertMultiplePositions(mixedValues, keys);
            });

        });
    });

    describe('should limit history', () => {
        it('no limit by default', () => {
            store = new Store();
            expect(store.limitHistory).toEqual(0);
        });
        it('limit by store config', () => {
            store = new Store({
                limitHistory: 10
            });
            expect(store.limitHistory).toEqual(10);
        });

        describe('for single entry', () => {

            // Local assertion callback
            const assertLimit = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    const limit = 3;
                    store = new Store({
                        limitHistory: limit
                    });
                    for (let i = 0; i < 5; i++) {
                        store.set(key, value);
                        // We expect to reach limit of entries so for limit 3 max position will be 2 (0-based index)
                        const expectedPosition = i < limit ? i : limit - 1;
                        expect(store.position(key)).toEqual(expectedPosition);
                        expect(store.get(key)).toEqual(value);
                    }
                });
            };

            Object.keys(keys).forEach((keyLabel) => {
                it(`using ${keyLabel} as an identifier`, () => {
                    // Local assertion callback
                    const mixedValues = [
                        ...primitiveValues,
                        ...arrays,
                        ...objects
                    ];

                    assertLimit(mixedValues, keys[keyLabel]);
                });
            });

        });

        describe('for multiple entries', () => {

            // Local assertion callback
            const assertMultipleLimits = (
                values: any[],
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
            ) => {
                values.forEach((value) => {
                    const limit = 3;
                    store = new Store({
                        limitHistory: limit
                    });
                    const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                    Object.keys(keyConfigs).forEach((keyLabel) => {
                        sets.push({
                            key: keyConfigs[keyLabel],
                            value: value
                        });
                    });

                    const keysToCheck = sets.map((set) => {
                        return set.key;
                    });

                    for (let i = 0; i < 5; i++) {
                        store.set(sets);

                        const returnedPositions = store.position(keysToCheck) as number[];

                        if (returnedPositions){
                            // We expect to reach limit of entries so for limit 3 max position will be 2 (0-based index)
                            const expectedPosition = i < limit ? i : limit - 1;

                            returnedPositions.forEach((position) => {
                                expect(position).toEqual(expectedPosition);
                            });

                            sets.forEach((set) => {
                                expect(store.get(set.key)).toEqual(set.value);
                            });
                        } else {
                            expect(Array.isArray(returnedPositions)).toBeTruthy();
                        }
                    }
                });
            };

            it(`using various key types as an identifier`, () => {
                const mixedValues = [
                    ...primitiveValues,
                    ...arrays,
                    ...objects
                ];
                assertMultipleLimits(mixedValues, keys);
            });

        });
    });

    describe('should disable history', () => {

        it('history enabled by default', () => {
            store = new Store();
            expect(store.keepHistory).toBeTruthy();
        });

        it('disable history by store config', () => {
            store = new Store({
                keepHistory: false
            });
            expect(store.keepHistory).toBeFalsy();
        });

        describe('for single entry', () => {

            // Local assertion callback
            const assertDisabledHistory = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new Store({
                        keepHistory: false
                    });
                    for (let i = 0; i < 5; i++) {
                        store.set(key, value);
                        expect(store.position(key)).toEqual(0);
                        expect(store.get(key)).toEqual(value);
                    }
                });
            };

            Object.keys(keys).forEach((keyLabel) => {
                it(`using ${keyLabel} as an identifier`, () => {
                    // Local assertion callback
                    const mixedValues = [
                        ...primitiveValues,
                        ...arrays,
                        ...objects
                    ];

                    assertDisabledHistory(mixedValues, keys[keyLabel]);
                });
            });

        });

        describe('for multiple entries', () => {

            // Local assertion callback
            const assertMultipleDisabledHistory = (
                values: any[],
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
            ) => {
                values.forEach((value) => {
                    store = new Store({
                        keepHistory: false
                    });
                    const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                    Object.keys(keyConfigs).forEach((keyLabel) => {
                        sets.push({
                            key: keyConfigs[keyLabel],
                            value: value
                        });
                    });

                    const keysToCheck = sets.map((set) => {
                        return set.key;
                    });

                    for (let i = 0; i < 5; i++) {
                        store.set(sets);

                        const returnedPositions = store.position(keysToCheck) as number[];

                        if (returnedPositions){

                            returnedPositions.forEach((position) => {
                                expect(position).toEqual(0);
                            });

                            sets.forEach((set) => {
                                expect(store.get(set.key)).toEqual(set.value);
                            });
                        } else {
                            expect(Array.isArray(returnedPositions)).toBeTruthy();
                        }
                    }
                });
            };

            it(`using various key types as an identifier`, () => {
                const mixedValues = [
                    ...primitiveValues,
                    ...arrays,
                    ...objects
                ];
                assertMultipleDisabledHistory(mixedValues, keys);
            });

        });
    });

    describe('should handle non-linear history', () => {

        it('non-linear history disabled by default', () => {
            store = new Store();
            expect(store.keepForwardHistory).toBeFalsy();
        });

        it('enable non-linear history by store config', () => {
            store = new Store({
                keepForwardHistory: true
            });
            expect(store.keepForwardHistory).toBeTruthy();
        });

        // TODO: implement moving in history first

        xdescribe('for single entry', () => {

            // Local assertion callback
            const assertNonLinearHistory = (
                values: any[],
                key: StoreEntryKeySubstitute,
                keepForwardHistory: boolean
            ) => {
                values.forEach((value) => {
                    store = new Store({
                        keepForwardHistory: keepForwardHistory
                    });

                    const historyLength = 10;
                    const positionToMoveTo = 5;
                    const expectedHistoryLength = historyLength + 1;
                    if (keepForwardHistory){

                    }

                    for (let i = 0; i < historyLength - 1; i++) {
                        store.set(key, value);
                    }

                });
            };

            describe('if non-linear history enabled', () => {

                Object.keys(keys).forEach((keyLabel) => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        // Local assertion callback
                        const mixedValues = [
                            ...primitiveValues,
                            ...arrays,
                            ...objects
                        ];

                        assertNonLinearHistory(mixedValues, keys[keyLabel], true);
                    });
                });

            });

            describe('if non-linear history disabled', () => {

                Object.keys(keys).forEach((keyLabel) => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        // Local assertion callback
                        const mixedValues = [
                            ...primitiveValues,
                            ...arrays,
                            ...objects
                        ];

                        assertNonLinearHistory(mixedValues, keys[keyLabel], false);
                    });
                });

            });

        });

        xdescribe('for multiple entries', () => {

            // Local assertion callback
            const assertMultipleNonLinearHistory = (
                values: any[],
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute },
                keepForwardHistory: boolean
            ) => {
                values.forEach((value) => {
                    store = new Store({
                        keepForwardHistory: keepForwardHistory
                    });
                    const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                    Object.keys(keyConfigs).forEach((keyLabel) => {
                        sets.push({
                            key: keyConfigs[keyLabel],
                            value: value
                        });
                    });

                    const keysToCheck = sets.map((set) => {
                        return set.key;
                    });

                    for (let i = 0; i < 5; i++) {
                        store.set(sets);

                        const returnedPositions = store.position(keysToCheck) as number[];

                        if (returnedPositions){
                            returnedPositions.forEach((position) => {
                                expect(position).toEqual(i);
                            });
                        } else {
                            expect(Array.isArray(returnedPositions)).toBeTruthy();
                        }
                    }
                });
            };

            xdescribe('if non-linear history enabled', () => {

                it(`using various key types as an identifier`, () => {
                    const mixedValues = [
                        ...primitiveValues,
                        ...arrays,
                        ...objects
                    ];
                    assertMultipleNonLinearHistory(mixedValues, keys);
                });

            });

            xdescribe('if non-linear history disabled', () => {

                it(`using various key types as an identifier`, () => {
                    const mixedValues = [
                        ...primitiveValues,
                        ...arrays,
                        ...objects
                    ];
                    assertMultipleNonLinearHistory(mixedValues, keys);
                });

            });
        });

    });
});
