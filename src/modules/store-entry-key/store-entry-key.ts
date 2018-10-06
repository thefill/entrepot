/**
 * Represents key for the base-store entry
 */
import {IStoreEntryKeyConfig} from './store-entry-key.interface';

export class StoreEntryKey implements IStoreEntryKeyConfig {
    // Entry namespace key
    public namespace: string;
    // Entry key
    public key: string;
    // history enabled, by default enabled
    public keepHistory = true;
    // history limit, by default no limit
    public limitHistory = 0;

    /**
     * Create key
     * @param {string | IStoreEntryKeyConfig | StoreEntryKey} key
     */
    constructor(key?: string | IStoreEntryKeyConfig | StoreEntryKey) {
        // if no values
        if (!key) {
            return;
        }

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
            return;
        } else if (key.namespace) {
            // if namespace without key
            throw new Error('You can\'t create key entry with only namespace value');
        }
        // if none from above - illegal config object passed
        throw new Error('Can\'t create key entry - invalid config passed');
    }
}
