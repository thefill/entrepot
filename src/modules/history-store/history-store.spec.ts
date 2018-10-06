import {HistoryStore} from './history-store';
import {StoreEntryKeySubstitute} from '../store-entry-key';
import {generateTestValues, testKeys} from '../utils';

describe('HistoryStore', () => {
    let store: HistoryStore;
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    const keys: { [keyLabel: string]: StoreEntryKeySubstitute } = testKeys;

    beforeEach(() => {
        store = new HistoryStore();
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    });

    describe('should retrieve values from specific position', () => {

        describe('single entry value', () => {

            // Local assertion callback
            const assertRetrievalWithPosition = (key: StoreEntryKeySubstitute) => {
                store = new HistoryStore();
                for (let i = 0; i < 5; i++) {
                    store.set(key, i);
                }

                for (let i = 0; i < 5; i++) {
                    const retrievedValue = store.get(key, i);
                    expect(retrievedValue).toEqual(i);
                }
            };

            Object.keys(keys).forEach((keyLabel) => {

                describe(`primitive value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertRetrievalWithPosition(keys[keyLabel]);
                    });
                });

                describe(`array value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertRetrievalWithPosition(keys[keyLabel]);
                    });
                });

                describe(`object value`, () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertRetrievalWithPosition(keys[keyLabel]);
                    });
                });
            });

        });

        describe('multiple entries values', () => {

            // Local assertion callback
            const assertMultipleRetrievalWithPosition = (
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
            ) => {
                store = new HistoryStore();
                for (let i = 0; i < 5; i++) {
                    const sets: Array<{ key: StoreEntryKeySubstitute, value: any }> = [];

                    Object.keys(keyConfigs).forEach((keyLabel) => {
                        sets.push({
                            key: keyConfigs[keyLabel],
                            value: i
                        });
                    });

                    store.set(sets);
                }

                const keysToCheck = Object.keys(keyConfigs).map((keyLabel) => keyConfigs[keyLabel]);

                for (let i = 0; i < 5; i++) {
                    const retrievedValues = store.get(keysToCheck, i);
                    retrievedValues.forEach((retrievedValue) => {
                        expect(retrievedValue).toEqual(i);
                    });
                }
            };

            it(`with primitive values`, () => {
                assertMultipleRetrievalWithPosition(keys);
            });

            it(`with array values`, () => {
                assertMultipleRetrievalWithPosition(keys);
            });

            it(`with object values`, () => {
                assertMultipleRetrievalWithPosition(keys);
            });

        });

    });

    describe('should return correct position', () => {

        describe('for single entry', () => {

            // Local assertion callback
            const assertPosition = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new HistoryStore();
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
                    store = new HistoryStore();
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

                        if (returnedPositions) {
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
            store = new HistoryStore();
            expect(store.limitHistory).toEqual(0);
        });
        it('limit by base-store config', () => {
            store = new HistoryStore({
                limitHistory: 10
            });
            expect(store.limitHistory).toEqual(10);
        });

        describe('for single entry', () => {

            // Local assertion callback
            const assertLimit = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    const limit = 3;
                    store = new HistoryStore({
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
                    store = new HistoryStore({
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

                        if (returnedPositions) {
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
            store = new HistoryStore();
            expect(store.keepHistory).toBeTruthy();
        });

        it('disable history by base-store config', () => {
            store = new HistoryStore({
                keepHistory: false
            });
            expect(store.keepHistory).toBeFalsy();
        });

        describe('for single entry', () => {

            // Local assertion callback
            const assertDisabledHistory = (values: any[], key: StoreEntryKeySubstitute) => {
                values.forEach((value) => {
                    store = new HistoryStore({
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
                    store = new HistoryStore({
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

                        if (returnedPositions) {

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

    describe('should retrieve entry history', () => {

        // Local assertion callback
        const assertHistory = (values: any[], key: StoreEntryKeySubstitute) => {
            values.forEach((value) => {
                store = new HistoryStore();
                for (let i = 0; i < 5; i++) {
                    store.set(key, value);
                    const history = store.history(key) as any[];
                    expect(history.length).toEqual(i + 1);
                    expect(history[i]).toEqual(value);
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

                assertHistory(mixedValues, keys[keyLabel]);
            });
        });
    });

    describe('should move back in entry history', () => {

        describe('move back by default one step', () => {

            Object.keys(keys).forEach((keyLabel) => {
                describe(`using ${keyLabel} as an identifier`, () => {
                    store = new HistoryStore();
                    const key = keys[keyLabel];

                    for (let i = 0; i < 5; i++) {
                        store.set(key, i);
                    }

                    for (let i = 4; i >= 1; i--) {
                        store.undo(key);
                        expect(store.position(key)).toEqual(i - 1);
                    }
                });
            });

        });

        describe('move back up to position 0', () => {

            Object.keys(keys).forEach((keyLabel) => {
                describe(`using ${keyLabel} as an identifier`, () => {
                    store = new HistoryStore();
                    const key = keys[keyLabel];

                    for (let i = 0; i < 5; i++) {
                        store.set(key, i);
                    }

                    for (let i = 4; i >= -5; i--) {
                        store.undo(key);
                        if (i > 0) {
                            expect(store.position(key)).toEqual(i - 1);
                        } else {
                            expect(store.position(key)).toEqual(0);
                        }
                    }
                });
            });

        });

        describe('move back by custom number of steps', () => {

            Object.keys(keys).forEach((keyLabel) => {
                describe(`using ${keyLabel} as an identifier`, () => {
                    const key = keys[keyLabel];

                    for (let i = 1; i < 5; i++) {
                        store = new HistoryStore();
                        for (let j = 0; j < 5; j++) {
                            store.set(key, j);
                        }

                        store.undo(key, i);
                        expect(store.position(key)).toEqual(4 - i);
                    }

                });
            });

        });

    });

    describe('should move forward in entry history', () => {

        describe('move forward by default one step', () => {

            Object.keys(keys).forEach((keyLabel) => {
                describe(`using ${keyLabel} as an identifier`, () => {
                    store = new HistoryStore();
                    const key = keys[keyLabel];

                    for (let i = 0; i < 5; i++) {
                        store.set(key, i);
                    }

                    store.undo(key, 4);

                    for (let i = 0; i < 4; i++) {
                        store.redo(key);
                        expect(store.position(key)).toEqual(i + 1);
                    }
                });
            });

        });

        describe('move forward up to last position', () => {

            Object.keys(keys).forEach((keyLabel) => {
                describe(`using ${keyLabel} as an identifier`, () => {
                    store = new HistoryStore();
                    const key = keys[keyLabel];

                    for (let i = 0; i < 5; i++) {
                        store.set(key, i);
                    }

                    store.undo(key, 4);

                    for (let i = 0; i < 4; i++) {
                        store.redo(key);
                        if (i < (store.history(key) as any[]).length) {
                            expect(store.position(key)).toEqual(i + 1);
                        } else {
                            expect(store.position(key)).toEqual((store.history(key) as any[]).length - 1);
                        }
                    }
                });
            });

        });

        describe('move forward by custom number of steps', () => {

            Object.keys(keys).forEach((keyLabel) => {
                describe(`using ${keyLabel} as an identifier`, () => {
                    const key = keys[keyLabel];

                    for (let i = 1; i < 5; i++) {
                        store = new HistoryStore();
                        for (let j = 0; j < 5; j++) {
                            store.set(key, j);
                        }

                        store.undo(key, 4);

                        store.redo(key, i);
                        expect(store.position(key)).toEqual(i);
                    }

                });
            });

        });

    });

    describe('should handle non-linear history', () => {

        it('non-linear history disabled by default', () => {
            store = new HistoryStore();
            expect(store.keepForwardHistory).toBeFalsy();
        });

        it('enable non-linear history by base-store config', () => {
            store = new HistoryStore({
                keepForwardHistory: true
            });
            expect(store.keepForwardHistory).toBeTruthy();
        });

        describe('for single entry', () => {

            // Local assertion callback
            const assertNonLinearHistory = (
                values: any[],
                key: StoreEntryKeySubstitute,
                keepForwardHistory: boolean
            ) => {
                values.forEach((value) => {
                    store = new HistoryStore({
                        keepForwardHistory: keepForwardHistory
                    });

                    const historyLength = 10;

                    const positionToMoveTo = 5;
                    // for non-linear history we expect insert of new value
                    // and to keep forward history untouched
                    let expectedHistoryLength = historyLength + 1;
                    if (!keepForwardHistory) {
                        // if linear history we just add new value and remove forward
                        // history entries
                        expectedHistoryLength = positionToMoveTo + 1;
                    }

                    for (let i = 0; i < historyLength; i++) {
                        store.set(key, value);
                    }

                    // move in history to the middle of history stack
                    store.undo(key, positionToMoveTo);
                    expect(store.position(key)).toEqual(positionToMoveTo - 1);

                    // set new value, value unique
                    store.set(key, historyLength + 1);

                    expect(store.position(key)).toEqual(positionToMoveTo);
                    expect((store.history(key) as any[]).length).toEqual(expectedHistoryLength);
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

        describe('for multiple entries', () => {

            // Local assertion callback
            const assertMultipleNonLinearHistory = (
                values: any[],
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute },
                keepForwardHistory: boolean
            ) => {
                values.forEach((value) => {
                    store = new HistoryStore({
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

                    const historyLength = 10;

                    const positionToMoveTo = 5;
                    // for non-linear history we expect insert of new value
                    // and to keep forward history untouched
                    let expectedHistoryLength = historyLength + 1;
                    if (!keepForwardHistory) {
                        // if linear history we just add new value and remove forward
                        // history entries
                        expectedHistoryLength = positionToMoveTo + 1;
                    }

                    for (let i = 0; i < historyLength; i++) {
                        store.set(sets);
                    }

                    keysToCheck.forEach((key) => {
                        // move in history to the middle of history stack
                        store.undo(key, positionToMoveTo);
                        expect(store.position(key)).toEqual(positionToMoveTo - 1);

                        // set new value, value unique
                        store.set(key, historyLength + 1);

                        expect(store.position(key)).toEqual(positionToMoveTo);
                        expect((store.history(key) as any[]).length).toEqual(expectedHistoryLength);
                    });
                });
            };

            describe('if non-linear history enabled', () => {

                it(`using various key types as an identifier`, () => {
                    const mixedValues = [
                        ...primitiveValues,
                        ...arrays,
                        ...objects
                    ];
                    assertMultipleNonLinearHistory(mixedValues, keys, true);
                });

            });

            describe('if non-linear history disabled', () => {

                it(`using various key types as an identifier`, () => {
                    const mixedValues = [
                        ...primitiveValues,
                        ...arrays,
                        ...objects
                    ];
                    assertMultipleNonLinearHistory(mixedValues, keys, false);
                });

            });

        });

    });
});
