import { StoreEntryKeyClass } from "./store-entry-key.class";
import { IStoreEntry, IStoreEntryConfig } from "./store.interface";
/**
 * Main store class
 */
export declare class Store {
    /**
     * Separate values from their references
     * @param {any} value
     * @return {any}
     */
    private static decoupleValue;
    protected store: {
        [namespace: string]: IStoreEntry | {
            [key: string]: IStoreEntry;
        };
    };
    /**
     * Set single result
     * @param {string | IStoreEntryConfig} key
     * @param {any} value
     * @return {StoreEntryKeyClass}
     */
    set(key: string | IStoreEntryConfig, value?: any): StoreEntryKeyClass | void;
    entryExists(key: StoreEntryKeyClass): boolean;
    /**
     * Get
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    get<T>(key: string | IStoreEntryConfig | StoreEntryKeyClass): T | void;
    /**
     * Set or update value in store
     * @param {StoreEntryKeyClass} key
     * @param {any} value
     * @return {boolean}
     */
    protected setOrUpdate(key: StoreEntryKeyClass, value: any): boolean;
}
