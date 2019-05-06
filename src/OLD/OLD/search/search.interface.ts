import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';

export type SearchCallback<T = any> = (value: T, key: StoreEntryKey) => boolean;

export interface ISearch<T = any> {
    find: (SearchCallback) => T | void;
    findKey: (SearchCallback) => StoreEntryKey | void;
    findAll: (SearchCallback) => void | Array<T | void>;
    findAllKeys: (SearchCallback) => void | Array<StoreEntryKey | void>;
}
