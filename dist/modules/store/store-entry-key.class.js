/**
 * Represents key for the store entry
 */
export class StoreEntryKeyClass {
    /**
     * Create key
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     */
    constructor(key) {
        // if key object passed - don't create again
        if (key instanceof StoreEntryKeyClass) {
            Object.assign(this, key);
            return;
        }
        // if not key config
        if (typeof key === "string") {
            this.key = key;
            return;
        }
        else if (key.key) {
            this.key = key.key;
            if (key.namespace) {
                this.namespace = key.namespace;
            }
        }
    }
}
//# sourceMappingURL=store-entry-key.class.js.map