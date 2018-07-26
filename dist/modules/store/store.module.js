import { StoreEntryKeyClass } from "./store-entry-key.class";
/**
 * Main store class
 */
export class Store {
    constructor() {
        // TODO: get history list
        // TODO: get history length
        // TODO: get history list with values
        // TODO: move back in time x steps
        // TODO: get value from x step
        // TODO: move back in time to prev
        // TODO: remove
        // TODO: reset
        // TODO: move back in time to next (if keep forward)
        // TODO: emit change
        // TODO: automatic docs via http://typedoc.org/guides/doccomments/
        // TODO: set / remove / update multiple
        // TODO: set multiple in constructor with initial hydration
        // Main store
        this.store = {};
    }
    /**
     * Separate values from their references
     * @param {any} value
     * @return {any}
     */
    static decoupleValue(value) {
        if (!value) {
            return value;
        }
        if (Array.isArray(value)) {
            return value.slice();
        }
        else if (typeof value === "object") {
            return Object.assign({}, value);
        }
        return value;
    }
    /**
     * Set single result
     * @param {string | IStoreEntryConfig} key
     * @param {any} value
     * @return {StoreEntryKeyClass}
     */
    set(key, value) {
        const keyObject = new StoreEntryKeyClass(key);
        if (!keyObject.key) {
            return;
        }
        value = Store.decoupleValue(value);
        this.setOrUpdate(keyObject, value);
        return this.setOrUpdate(keyObject, value) ? keyObject : undefined;
    }
    entryExists(key) {
        if (key.namespace) {
            return !!(this.store[key.namespace] && this.store[key.key]);
        }
        else {
            return !!this.store[key.key];
        }
    }
    /**
     * Get
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    get(key) {
        if (!key) {
            return;
        }
        let keyValue;
        let namespaceValue;
        if (typeof key === "string") {
            keyValue = key;
        }
        else {
            keyValue = key.key;
            namespaceValue = key.namespace;
        }
        if (!keyValue) {
            return;
        }
        return namespaceValue
            ? this.store[namespaceValue][keyValue]
            : this.store[keyValue];
    }
    /**
     * Set or update value in store
     * @param {StoreEntryKeyClass} key
     * @param {any} value
     * @return {boolean}
     */
    setOrUpdate(key, value) {
        if (!this.entryExists(key)) {
            return false;
        }
        if (key.namespace) {
            this.store[key.namespace] = { [key.key]: value };
        }
        else {
            this.store[key.key] = value;
        }
        return true;
    }
}
//# sourceMappingURL=store.module.js.map