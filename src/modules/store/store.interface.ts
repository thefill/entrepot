import {StoreEntryKeyClass} from "../store-entry-key";


/**
 * Values used for store initial hydration
 */
export type initialValues<T = any> = Array<{ key: StoreEntryKeySubstitute, value: T }>;

/**
 * Config for newly created store
 */
export interface IStoreConfig<T = any> {
    // initial values
    initialValues?: initialValues<T>;
    // keep history of entry values
    keepHistory?: boolean;
    // count of entry values stored, inclusive of limit
    limitHistory?: number;
    // if current position in the middle of history preserve forward entries, push new value after current one
    // e.g. 10 records in the history, current position is 5 (6th entry), we push new change:
    //  - if keepForwardHistory true we will put new value after position 5 (11 records left)
    //  - if keepForwardHistory false we will put new value after position 5 and remove other records (7 records left)
    keepForwardHistory?: boolean;

    // TODO: implement: Schema: json schema
    // TODO: implement: persistTime: number
    // TODO: implement: debounceEmit

}

/**
 * Config for newly created store entry
 */
export interface IStoreEntryKeyConfig {
    // Group values under namespace, unique
    namespace?: string;
    // id of an entry, unique per namespaces, unique if outside namespaces (global namespace)
    key: string;
}

/**
 * Possible values used to get / set / delete values from the store
 */
export type StoreEntryKeySubstitute = string | IStoreEntryKeyConfig | StoreEntryKeyClass;

/**
 * Single entry
 */
export interface IStoreEntry<T = any> {
    currentPosition: number;
    history: T[];
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

/**
 * Snapshot of the whole store state - includes namespaces and single values
 */
export interface IStoreSnapshot<T> {
    namespaceStore: IInternalNamespaceStore<T>;
    store: IInternalStore<T>;
}
