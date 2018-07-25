import { IStoreEntryConfig } from "./store.interface";
/**
 * Represents key for the store entry
 */
export declare class StoreEntryKeyClass {
    namespace: string;
    key: string;
    /**
     * Create key
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     */
    constructor(key: string | IStoreEntryConfig | StoreEntryKeyClass);
}
