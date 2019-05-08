import {SpecUtils} from '../spec-utils';
import {MappedStore} from './mapped-store.class';

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

    describe('should decouple values', () => {
        expect(1).toBeTruthy();

    });

    // describe('should add entry', () => {
    //
    //     // Local assertion callback
    //     const assertExist = (values: any[], key: StoreEntryKeySubstitute) => {
    //         values.forEach((value) => {
    //             store = new BaseStore();
    //             store.set(key, value);
    //             expect(store.exists(key)).toBeTruthy();
    //         });
    //     };
    //
    //     Object.keys(keys).forEach((keyLabel) => {
    //         describe(`with primitive value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertExist(primitiveValues, keys[keyLabel]);
    //             });
    //         });
    //
    //         describe(`with array value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertExist(arrays, keys[keyLabel]);
    //             });
    //         });
    //
    //         describe(`with object value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertExist(objects, keys[keyLabel]);
    //             });
    //         });
    //
    //     });
    //
    // });
    //
    // describe('should return reference to the store when adding', () => {
    //
    //     // Local assertion callback
    //     const assertReturnedKey = (values: any[], key: StoreEntryKeySubstitute) => {
    //         values.forEach((value) => {
    //             store = new BaseStore();
    //             const returnedKey = store.set(key, value);
    //             expect(returnedKey instanceof StoreEntryKey).toBeTruthy();
    //         });
    //     };
    //
    //     Object.keys(keys).forEach((keyLabel) => {
    //
    //         describe(`with primitive value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertReturnedKey(primitiveValues, keys[keyLabel]);
    //             });
    //         });
    //
    //         describe(`with array value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertReturnedKey(arrays, keys[keyLabel]);
    //             });
    //         });
    //
    //         describe(`with object value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertReturnedKey(objects, keys[keyLabel]);
    //             });
    //         });
    //
    //     });
    //
    // });
    //
    // describe('should hydrate store with initial values', () => {
    //
    //     // Local assertion callback
    //     const assertHydration = (
    //         values: any[],
    //         keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
    //     ) => {
    //         values.forEach((value) => {
    //             const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];
    //
    //             Object.keys(keyConfigs).forEach((keyLabel) => {
    //                 sets.push({
    //                     key: keyConfigs[keyLabel],
    //                     value: value
    //                 });
    //             });
    //
    //             const storeConfig: IBaseStoreConfig = {
    //                 initialValues: sets
    //             };
    //             store = new BaseStore(storeConfig);
    //
    //             Object.keys(keyConfigs).forEach((keyLabel) => {
    //                 const retrievedValue = store.get(keyConfigs[keyLabel]);
    //                 expect(retrievedValue).toEqual(value);
    //             });
    //         });
    //     };
    //
    //     it(`with primitive values`, () => {
    //         assertHydration(primitiveValues, keys);
    //     });
    //
    //     it(`with array values`, () => {
    //         assertHydration(arrays, keys);
    //     });
    //
    //     it(`with object values`, () => {
    //         assertHydration(objects, keys);
    //     });
    //
    //     it(`with various type of values`, () => {
    //         const mixedValues = [
    //             ...primitiveValues,
    //             ...arrays,
    //             ...objects
    //         ];
    //         assertHydration(mixedValues, keys);
    //     });
    //
    // });
    //
    // describe('should check if entry exists', () => {
    //
    //     // Local assertion callback
    //     const assertExistance = (
    //         values: any[],
    //         keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
    //     ) => {
    //         values.forEach((value) => {
    //             const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];
    //
    //             Object.keys(keyConfigs).forEach((keyLabel) => {
    //                 sets.push({
    //                     key: keyConfigs[keyLabel],
    //                     value: value
    //                 });
    //             });
    //
    //             const storeConfig: IBaseStoreConfig = {
    //                 initialValues: sets
    //             };
    //             store = new BaseStore(storeConfig);
    //
    //             Object.keys(keyConfigs).forEach((keyLabel) => {
    //                 expect(store.exists(keyConfigs[keyLabel])).toBeTruthy();
    //                 store.delete(keyConfigs[keyLabel]);
    //
    //                 expect(store.exists(keyConfigs[keyLabel])).toBeFalsy();
    //             });
    //         });
    //     };
    //
    //     it(`with primitive values`, () => {
    //         assertExistance(primitiveValues, keys);
    //     });
    //
    //     it(`with array values`, () => {
    //         assertExistance(arrays, keys);
    //     });
    //
    //     it(`with object values`, () => {
    //         assertExistance(objects, keys);
    //     });
    //
    //     it(`with various type of values`, () => {
    //         const mixedValues = [
    //             ...primitiveValues,
    //             ...arrays,
    //             ...objects
    //         ];
    //         assertExistance(mixedValues, keys);
    //     });
    // });
    //
    // describe('should reset whole store', () => {
    //     // Local assertion callback
    //     const values = [
    //         ...primitiveValues,
    //         ...arrays,
    //         ...objects
    //     ];
    //
    //     values.forEach((value) => {
    //         const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];
    //
    //         Object.keys(keys).forEach((keyLabel) => {
    //             sets.push({
    //                 key: keys[keyLabel],
    //                 value: value
    //             });
    //         });
    //
    //         const storeConfig: IBaseStoreConfig = {
    //             initialValues: sets
    //         };
    //         store = new BaseStore(storeConfig);
    //         store.reset();
    //
    //         Object.keys(keys).forEach((keyLabel) => {
    //             expect(store.exists(keys[keyLabel])).toBeFalsy();
    //         });
    //     });
    //
    // });
    //
    // describe('should delete data from the base-store', () => {
    //
    //     // Local assertion callback
    //     const assertDeletion = (values: any[], key: StoreEntryKeySubstitute) => {
    //         values.forEach((value) => {
    //             store = new BaseStore();
    //             store.set(key, value);
    //             const retrievedValue = store.delete(key);
    //             expect(retrievedValue).toEqual(value);
    //             expect(store.exists(key)).toBeFalsy();
    //         });
    //     };
    //
    //     Object.keys(keys).forEach((keyLabel) => {
    //
    //         describe(`primitive value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertDeletion(primitiveValues, keys[keyLabel]);
    //             });
    //         });
    //
    //         describe(`array value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertDeletion(arrays, keys[keyLabel]);
    //             });
    //         });
    //
    //         describe(`object value`, () => {
    //             it(`using ${keyLabel} as an identifier`, () => {
    //                 assertDeletion(objects, keys[keyLabel]);
    //             });
    //         });
    //     });
    //
    // });
    //
    // it.skip('should produce snapshot of all key-value pairs', () => {
        //
        // // Local assertion callback
        // const assertSnapshot = (
        //     values: any[],
        //     keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
        // ) => {
        //     values.forEach((value) => {
        //         store = new StoreWithBackup();
        //         const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];
        //
        //         Object.keys(keyConfigs).forEach((keyLabel) => {
        //             sets.push({
        //                 key: keyConfigs[keyLabel],
        //                 value: value
        //             });
        //         });
        //
        //         const keysToCheck = sets.map((set) => {
        //             return set.key;
        //         });
        //
        //         for (let i = 0; i < 5; i++) {
        //             store.set(sets);
        //         }
        //
        //         const snapshot = store.snapshot();
        //
        //         expect(snapshot.namespaceStore).toBeTruthy();
        //         expect(snapshot.store).toBeTruthy();
        //
        //         keysToCheck.forEach((key) => {
        //             key = new StoreEntryKey(key);
        //             let snapshotEntry: IStoreEntry<any>;
        //             if (key.namespace){
        //                 snapshotEntry = snapshot.namespaceStore[key.namespace][key.key];
        //             } else {
        //                 snapshotEntry = snapshot.store[key.key];
        //             }
        //
        //             expect(snapshotEntry.currentPosition).toEqual(4);
        //             expect(snapshotEntry.history.length).toEqual(5);
        //
        //             snapshotEntry.history.forEach((historyValue) => {
        //                 expect(historyValue).toEqual(value);
        //             });
        //
        //         });
        //     });
        // };
        //
        // const mixedValues = [
        //     ...primitiveValues,
        //     ...arrays,
        //     ...objects
        // ];
        // assertSnapshot(mixedValues, keys);
    // });
});
