/**
 * Config for newly created store entry
 */
import {StoreEntryKeyClass} from "./store-entry-key.class";

export interface IStoreEntryConfig {
    namespace?: string;
    key?: string;
    // TODO: implement:
    // history?: boolean;
    // historyLimit?: number;
    // Schema: json schema
    // persistTime: number
    // debounceEmit
    // keepForwardHistory
}

/**
 * Possible values used to get / set / delete values from the store
 */
export type StoreEntryKeySubstitute = string | IStoreEntryConfig | StoreEntryKeyClass;

/**
 * Single entry
 */
export interface IStoreEntry<T = any> {
    currentStep: number;
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
