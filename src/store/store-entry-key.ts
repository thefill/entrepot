import {IStoreEntryConfig} from "./index";

/**
 * Represents key for the store entry
 */
export class StoreEntryKey {
    // Entry namespace key
    public namespace: string;
    // Entry key
    public key: string;

    constructor(key: string | IStoreEntryConfig | StoreEntryKey) {

        // if key object passed - don't create again
        if (key instanceof StoreEntryKey) {
            Object.assign(this, key);
            return;
        }

        // if not key config
        if (typeof key === 'string') {
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