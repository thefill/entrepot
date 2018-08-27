import {StoreEntryKeyClass} from "../store-entry-key";

/**
 * Config for newly created store entry
 */
export interface IStoreEntryConfig {
    namespace?: string;
    key: string;
    // TODO: implement: history?: boolean;
    // TODO: implement: historyLimit?: number;
    // TODO: implement: Schema: json schema
    // TODO: implement: persistTime: number
    // TODO: implement: debounceEmit
    // TODO: implement: keepForwardHistory
}

/**
 * Possible values used to get / set / delete values from the store
 */
export type StoreEntryKeySubstitute = string | IStoreEntryConfig | StoreEntryKeyClass;

/**
 * Single entry
 */
export interface IStoreEntry<T = any> {
    currentPosition: number;
    history: T[];
    update: (value: T) => number;
}

/**
 * Internal store for entries
 */
export interface IInternalStore<T> {
    [key: string]: IStoreEntry<T>;
}

/**
 * Internal store for entries inside namespace
 */
export interface IInternalNamespaceStore<T> {
    [namespace: string]: { [key: string]: IStoreEntry<T> };
}
