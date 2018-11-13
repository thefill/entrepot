import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';
import {IStoreEntry} from '../store-entry';

/**
 * Values used for base-store initial hydration
 */
export type initialValues<T = any> = Array<{ key: StoreEntryKeySubstitute, value: T }>;

/**
 * Config for newly created base-store
 */
export interface IBaseStoreConfig<T = any> {
    // initial values
    initialValues?: initialValues<T>;
}

export interface IBaseStore<T> extends IBaseStoreConfig<T>{
    exists: (key: StoreEntryKeySubstitute) => boolean;
    reset: (namespace?: StoreEntryKeySubstitute) => void;
    set: (
        key: StoreEntryKeySubstitute | Array<{ key: StoreEntryKeySubstitute, value: T }>,
        value?: T
    ) => StoreEntryKey | void | Array<StoreEntryKey | void>;
    get: (
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[],
        position?: number
    ) => T | void | Array<T | void>;
    delete: (
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ) => T | void | Array<T | void>;
}

/**
 * Internal base-store for entries
 */
export interface IInternalStore<T> {
    [key: string]: IStoreEntry<T>;
}

/**
 * Internal base-store for entries inside namespace
 */
export interface IInternalNamespaceStore<T> {
    [namespace: string]: { [key: string]: IStoreEntry<T> };
}
