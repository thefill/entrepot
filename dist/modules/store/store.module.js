"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_entry_key_class_1 = require("./store-entry-key.class");
var store_entry_class_1 = require("./store-entry.class");
/**
 * Main store class
 */
var Store = /** @class */ (function () {
    /**
     * Constructor
     * @param {Array} initialValues
     */
    function Store(initialValues) {
        // Main store
        this.store = {};
        // Main namespace store
        this.namespaceStore = {};
        // if values provided
        if (Array.isArray(initialValues) && initialValues.length) {
            // hydrate store with values
            this.set(initialValues);
        }
    }
    // TODO: get history list
    // TODO: get history length
    // TODO: get history list with values
    // TODO: move back in time x steps
    // TODO: get value from x step
    // TODO: get current step
    // TODO: move back in time to prev
    // TODO: move back in time to next (if keep forward)
    // TODO: emit change
    // TODO: automatic docs via http://typedoc.org/guides/doccomments/
    // TODO: move to npm-run-all
    // TODO: move to npm-watch
    /**
     * Separate values from their references
     * @param {any} value
     * @return {any}
     */
    Store.decoupleValue = function (value) {
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
    };
    /**
     * Check if namespace, entry in namespace or entry alone exists
     * @param {StoreEntryKeyClass} key
     * @returns {boolean}
     */
    Store.prototype.entryExists = function (key) {
        // if namespace and key to check
        if (key.namespace && key.key) {
            return !!(this.namespaceStore[key.namespace] &&
                this.namespaceStore[key.namespace][key.key]);
        }
        else if (key.namespace) {
            // if only namespace to check
            return !!this.namespaceStore[key.namespace];
        }
        else {
            // if only entry
            return !!this.store[key.key];
        }
    };
    /**
     * Reset:
     *  - whole store if no params provided
     *  - namespace: if namespace name or key provided
     * @param {StoreEntryKeySubstitute} key
     */
    Store.prototype.reset = function (namespace) {
        // if any reference namespace provided
        if (typeof namespace !== 'undefined') {
            if (typeof namespace === 'string') {
                delete this.store[namespace];
            }
            else if (namespace.namespace) {
                // if object with key provided
                delete this.store[namespace.namespace];
            }
        }
        else {
            // reset whole store
            this.store = {};
        }
    };
    /**
     * Set single or multiple entries, returns access key
     * @param {StoreEntryKeySubstitute | Array<{key: StoreEntryKeySubstitute; value: T}>} key
     * @param {T} value
     * @returns {StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void>}
     */
    Store.prototype.set = function (key, value) {
        var _this = this;
        // if multiple entries to create
        if (Array.isArray(key)) {
            return key.map(function (setConfig) {
                return _this.setEntry(setConfig.key, setConfig.value);
            });
        }
        else {
            // if no value
            return this.setEntry(key, value);
        }
    };
    /**
     * Get single or multiple entries
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {void | Array<void | T> | T}
     */
    Store.prototype.get = function (key) {
        var _this = this;
        // if multiple entries to create
        if (Array.isArray(key)) {
            return key.map(function (singleKey) {
                return _this.getEntry(singleKey);
            });
        }
        else {
            // if no value
            return this.getEntry(key);
        }
    };
    /**
     * Delete single or multiple entries, returns current entry value
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {T[] | void | void[] | T}
     */
    Store.prototype.delete = function (key) {
        var _this = this;
        // if multiple entries to create
        if (Array.isArray(key)) {
            return key.map(function (singleKey) {
                return _this.deleteEntry(singleKey);
            });
        }
        else {
            // if no value
            return this.deleteEntry(key);
        }
    };
    /**
     * Set single entry
     * @param {string | IStoreEntryConfig} key
     * @param {any} value
     * @return {StoreEntryKeyClass}
     */
    Store.prototype.setEntry = function (key, value) {
        var keyObject = new store_entry_key_class_1.StoreEntryKeyClass(key);
        if (!keyObject.key) {
            return;
        }
        // we don't pass undefined values to the store
        if (typeof value === 'undefined') {
            return;
        }
        value = Store.decoupleValue(value);
        this.setOrUpdateEntry(keyObject, value);
        return keyObject;
    };
    /**
     * Get single entry
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    Store.prototype.getEntry = function (key) {
        var keyObject = new store_entry_key_class_1.StoreEntryKeyClass(key);
        if (!keyObject.key) {
            return;
        }
        if (!this.entryExists(keyObject)) {
            return;
        }
        // retrieve entry
        var entry;
        if (keyObject.namespace) {
            entry = this.namespaceStore[keyObject.namespace][keyObject.key];
        }
        else {
            entry = this.store[keyObject.key];
        }
        return entry.history[entry.currentStep];
    };
    /**
     * Delete single entry, returns its current value
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    Store.prototype.deleteEntry = function (key) {
        var keyObject = new store_entry_key_class_1.StoreEntryKeyClass(key);
        if (!keyObject.key) {
            return;
        }
        if (!this.entryExists(keyObject)) {
            return;
        }
        // get entry value and delete entry form store
        var entry;
        // if entry in namespace
        if (keyObject.namespace && keyObject.key) {
            entry = this.namespaceStore[keyObject.namespace][keyObject.key];
            return entry.history[entry.currentStep];
        }
        else if (keyObject.namespace) {
            // if only namespace provided
            delete this.namespaceStore[keyObject.namespace];
            return;
        }
        else {
            entry = this.store[keyObject.key];
            return entry.history[entry.currentStep];
        }
    };
    /**
     * Set or update value in store
     * @param {StoreEntryKeyClass} key
     * @param {any} value
     * @return {boolean}
     */
    Store.prototype.setOrUpdateEntry = function (key, value) {
        var _a;
        // if entry does not exist in store
        if (!this.entryExists(key)) {
            var entry = new store_entry_class_1.StoreEntryClass(value);
            if (key.namespace) {
                this.namespaceStore[key.namespace] = (_a = {}, _a[key.key] = entry, _a);
            }
            else {
                this.store[key.key] = entry;
            }
        }
        else {
            // if entry exist in store
            if (key.namespace) {
                this.namespaceStore[key.namespace][key.key].update(value);
            }
            else {
                this.store[key.key].update(value);
            }
        }
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.module.js.map