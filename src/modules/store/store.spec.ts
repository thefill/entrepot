import {StoreEntryKeyClass} from '../store-entry-key';
import {StoreEntryKeySubstitute} from './store.interface';
import {Store} from './store.module';

// TODO: implement tests
describe('Store', () => {
    let store: Store;
    const initialValueConfigs: Array<{ key: StoreEntryKeySubstitute, value: T }> = [
        {
            key: 'someKey',
            value: 'someValue'
        },
        {
            key: {key: 'someKey2'},
            value: 'someValue'
        },
        {
            key: {namespace: 'someNamespace', key: 'someKey3'},
            value: 'someValue'
        },
        {
            key: new StoreEntryKeyClass('someKey'),
            value: 'someValue'
        },
        {
            key: new StoreEntryKeyClass({key: 'someKey2'}),
            value: 'someValue'
        },
        {
            key: new StoreEntryKeyClass(({namespace: 'someNamespace', key: 'someKey3'})),
            value: 'someValue'
        },
    ];

    beforeEach(() => {

    });

    it('should check if entry exists', () => {
        expect(1).toBeTruthy();
        // public entryExists(key: StoreEntryKeyClass): boolean {
        // if exist
        // if not exist
    });

    it('should check if entry exists', () => {
        expect(1).toBeTruthy();
        // public entryExists(key: StoreEntryKeyClass): boolean {
    });
});

// constructor(initialValues?: Array<{ key: StoreEntryKeySubstitute, value: T }>) {
//
//
// public reset(namespace?: StoreEntryKeySubstitute): void {
//
// public set(
//     key: StoreEntryKeySubstitute | Array<{ key: StoreEntryKeySubstitute, value: T }>,
//     value?: T
// ): StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void> {
//
// public get(
//     key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
// ): T | void | Array<T | void> {
//
// public delete(
//     key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
// ): T | void | Array<T | void> {
