import {IStoreEntryKeyConfig, StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';
import {BaseStore} from './base-store';
import {IBaseStoreConfig} from './base-store.interface';
import {generateTestValues, testKeys} from '../utils';

// public on(
//         event: EventTypes,
//         listener: StoreEventListener,
//         keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
// ): void {
//         public once(
//             event: EventTypes = EventTypes.ALL,
//         listener: StoreEventListener,
//         keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
// ): void {
//         public removeListener(
//             event: EventTypes,
//         listener: StoreEventListener,
//         keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
// ): void {
//         removeAllListeners()
//         protected emit(
//             event: EventTypes,
//         objectKey: StoreEntryKey,
// ...args: any[]
// ): void {

xdescribe('BaseStore integrated with Emitter', () => {
    let store: BaseStore;
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    const keys = testKeys;

    beforeEach(() => {
        store = new BaseStore();
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    });

    // TODO: add e2e tests for store integrated with emitter

    xdescribe('should add', () => {

        describe('single entry', () => {

            // Local assertion callback
            const assertExist = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new BaseStore();
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
                    store = new BaseStore();
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
});
