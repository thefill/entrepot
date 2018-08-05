import { StoreEntryKeyClass } from "./store-entry-key.class";
import { IInternalNamespaceStore, IInternalStore, StoreEntryKeySubstitute } from "./store.interface";
/**
 * Main store class
 */
export declare class Store<T = any> {
    /**
     * Separate values from their references
     * @param {any} value
     * @return {any}
     */
    private static decoupleValue;
    protected store: IInternalStore<T>;
    protected namespaceStore: IInternalNamespaceStore<T>;
    /**
     * Constructor
     * @param {Array} initialValues
     */
    constructor(initialValues?: Array<{
        key: StoreEntryKeySubstitute;
        value: T;
    }>);
    /**
     * Check if namespace, entry in namespace or entry alone exists
     * @param {StoreEntryKeyClass} key
     * @returns {boolean}
     */
    entryExists(key: StoreEntryKeyClass): boolean;
    /**
     * Reset:
     *  - whole store if no params provided
     *  - namespace: if namespace name or key provided
     * @param {StoreEntryKeySubstitute} key
     */
    reset(namespace?: StoreEntryKeySubstitute): void;
    /**
     * Set single or multiple entries, returns access key
     * @param {StoreEntryKeySubstitute | Array<{key: StoreEntryKeySubstitute; value: T}>} key
     * @param {T} value
     * @returns {StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void>}
     */
    set(key: StoreEntryKeySubstitute | Array<{
        key: StoreEntryKeySubstitute;
        value: T;
    }>, value?: T): StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void>;
    /**
     * Get single or multiple entries
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {void | Array<void | T> | T}
     */
    get(key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]): T | void | Array<T | void>;
    /**
     * Delete single or multiple entries, returns current entry value
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {T[] | void | void[] | T}
     */
    delete(key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]): T | void | Array<T | void>;
    /**
     * Set single entry
     * @param {string | IStoreEntryConfig} key
     * @param {any} value
     * @return {StoreEntryKeyClass}
     */
    protected setEntry(key: StoreEntryKeySubstitute, value?: T): StoreEntryKeyClass | void;
    /**
     * Get single entry
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    protected getEntry(key: StoreEntryKeySubstitute): T | void;
    /**
     * Delete single entry, returns its current value
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    protected deleteEntry(key: StoreEntryKeySubstitute): T | void;
    /**
     * Set or update value in store
     * @param {StoreEntryKeyClass} key
     * @param {any} value
     * @return {boolean}
     */
    protected setOrUpdateEntry(key: StoreEntryKeyClass, value: T): void;
}
