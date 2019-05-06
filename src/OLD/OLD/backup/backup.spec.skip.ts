import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';
import {IStoreEntry} from '../store-entry';
import {generateTestValues, testKeys, Utils} from '../utils';
import {Backup} from './backup';
import {HistoryStore} from '../history-store';

describe('Backup', () => {
    let store: HistoryStore & Backup;
    const StoreWithBackup = Utils.mixin(HistoryStore, [Backup]);
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    const keys = testKeys;

    beforeEach(() => {
        store = new StoreWithBackup();
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    });

    describe('should produce snapshot', () => {
        it('should produce snapshot of value base-store and namespace base-store', () => {

            // Local assertion callback
            const assertSnapshot = (
                values: any[],
                keyConfigs: { [keyLabel: string]: StoreEntryKeySubstitute }
            ) => {
                values.forEach((value) => {
                    store = new StoreWithBackup();
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
                    }

                    const snapshot = store.snapshot();

                    expect(snapshot.namespaceStore).toBeTruthy();
                    expect(snapshot.store).toBeTruthy();

                    keysToCheck.forEach((key) => {
                        key = new StoreEntryKey(key);
                        let snapshotEntry: IStoreEntry<any>;
                        if (key.namespace) {
                            snapshotEntry = snapshot.namespaceStore[key.namespace][key.key];
                        } else {
                            snapshotEntry = snapshot.store[key.key];
                        }

                        expect(snapshotEntry.currentPosition).toEqual(4);
                        expect(snapshotEntry.history.length).toEqual(5);

                        snapshotEntry.history.forEach((historyValue) => {
                            expect(historyValue).toEqual(value);
                        });

                    });
                });
            };

            const mixedValues = [
                ...primitiveValues,
                ...arrays,
                ...objects
            ];
            assertSnapshot(mixedValues, keys);
        });
    });
});
