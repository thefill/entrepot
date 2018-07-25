import { IStoreEntryConfig } from "./store.interface";

/**
 * Represents key for the store entry
 */
export class StoreEntryKeyClass {
    // Entry namespace key
    public namespace: string;
    // Entry key
    public key: string;

    /**
     * Create key
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     */
    constructor(key: string | IStoreEntryConfig | StoreEntryKeyClass) {
        // if key object passed - don't create again
        if (key instanceof StoreEntryKeyClass) {
            Object.assign(this, key);
            return;
        }

        // if not key config
        if (typeof key === "string") {
            this.key = key;
            return;
        } else if (key.key) {
            this.key = key.key;

            if (key.namespace) {
                this.namespace = key.namespace;
            }
        }
    }
}
