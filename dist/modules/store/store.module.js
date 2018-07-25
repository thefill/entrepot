"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_entry_key_class_1 = require("./store-entry-key.class");
/**
 * Main store class
 */
var Store = /** @class */ (function () {
    function Store() {
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
     * Set single result
     * @param {string | IStoreEntryConfig} key
     * @param {any} value
     * @return {StoreEntryKeyClass}
     */
    Store.prototype.set = function (key, value) {
        var keyObject = new store_entry_key_class_1.StoreEntryKeyClass(key);
        if (!keyObject.key) {
            return;
        }
        value = Store.decoupleValue(value);
        this.setOrUpdate(keyObject, value);
        return this.setOrUpdate(keyObject, value) ? keyObject : undefined;
    };
    Store.prototype.entryExists = function (key) {
        if (key.namespace) {
            return !!(this.store[key.namespace] && this.store[key.key]);
        }
        else {
            return !!this.store[key.key];
        }
    };
    /**
     * Get
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    Store.prototype.get = function (key) {
        if (!key) {
            return;
        }
        var keyValue;
        var namespaceValue;
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
    };
    /**
     * Set or update value in store
     * @param {StoreEntryKeyClass} key
     * @param {any} value
     * @return {boolean}
     */
    Store.prototype.setOrUpdate = function (key, value) {
        var _a;
        if (!this.entryExists(key)) {
            return false;
        }
        if (key.namespace) {
            this.store[key.namespace] = (_a = {}, _a[key.key] = value, _a);
        }
        else {
            this.store[key.key] = value;
        }
        return true;
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.module.js.map