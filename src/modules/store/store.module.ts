import {UtilsClass} from '../utils';
import {StoreEntryKeyClass} from "../store-entry-key";
import {StoreEntryClass} from "../store-entry";
import {IInternalNamespaceStore, IInternalStore, IStoreEntry, StoreEntryKeySubstitute} from "./store.interface";

/**
 * Main store class
 */
export class Store<T = any> {
    // TODO: get store snapshot not whole store: {namespace: {key: value}...}
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

    // Main store
    protected store: IInternalStore<T> = {};
    // Main namespace store
    protected namespaceStore: IInternalNamespaceStore<T> = {};

    /**
     * Constructor
     * @param {Array} initialValues
     */
    constructor(initialValues?: Array<{ key: StoreEntryKeySubstitute, value: T }>) {
        // if values provided
        if (Array.isArray(initialValues) && initialValues.length) {
            // hydrate store with values
            this.set(initialValues);
        }
    }

    /**
     * Check if namespace, entry in namespace or entry alone exists
     * @param {StoreEntryKeyClass} key
     * @returns {boolean}
     */
    public entryExists(key: StoreEntryKeyClass): boolean {
        // if namespace and key to check
        if (key.namespace && key.key) {
            return !!(this.namespaceStore[key.namespace] &&
                this.namespaceStore[key.namespace][key.key]);
        } else if (key.namespace) {
            // if only namespace to check
            return !!this.namespaceStore[key.namespace];
        } else {
            // if only entry
            return !!this.store[key.key];
        }
    }

    /**
     * Reset:
     *  - whole store if no params provided
     *  - namespace: if namespace name or key provided
     * @param {StoreEntryKeySubstitute} namespace
     */
    public reset(namespace?: StoreEntryKeySubstitute): void {
        // if any reference namespace provided
        if (typeof namespace !== 'undefined') {
            if (typeof namespace === 'string') {
                delete this.store[namespace];
            } else if (namespace.namespace) {
                // if object with key provided
                delete this.store[namespace.namespace];
            }
        } else {
            // reset whole store
            this.store = {};
        }
    }

    /**
     * Set single or multiple entries, returns access key
     * @param {StoreEntryKeySubstitute | Array<{key: StoreEntryKeySubstitute; value: T}>} key
     * @param {T} value
     * @returns {StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void>}
     */
    public set(
        key: StoreEntryKeySubstitute | Array<{ key: StoreEntryKeySubstitute, value: T }>,
        value?: T
    ): StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void> {
        // if multiple entries to create
        if (Array.isArray(key)) {
            return key.map((setConfig) => {
                return this.setEntry(setConfig.key, setConfig.value);
            });
        } else {
            // if no value
            return this.setEntry(key, value);
        }
    }

    /**
     * Get single or multiple entries
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {void | Array<void | T> | T}
     */
    public get(
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ): T | void | Array<T | void> {
        // if multiple entries to create
        if (Array.isArray(key)) {
            return key.map((singleKey) => {
                return this.getEntry(singleKey);
            });
        } else {
            // if no value
            return this.getEntry(key);
        }
    }

    /**
     * Delete single or multiple entries, returns current entry value
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {T[] | void | void[] | T}
     */
    public delete(
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ): T | void | Array<T | void> {
        // if multiple entries to create
        if (Array.isArray(key)) {
            return key.map((singleKey) => {
                return this.deleteEntry(singleKey);
            });
        } else {
            // if no value
            return this.deleteEntry(key);
        }
    }

    /**
     * Set single entry
     * @param {string | IStoreEntryConfig} key
     * @param {any} value
     * @return {StoreEntryKeyClass}
     */
    protected setEntry(
        key: StoreEntryKeySubstitute,
        value?: T
    ): StoreEntryKeyClass | void {
        const keyObject = new StoreEntryKeyClass(key);

        if (!keyObject.key) {
            return;
        }

        // we don't pass undefined values to the store
        if (typeof value === 'undefined') {
            return;
        }

        value = UtilsClass.decoupleValue(value);
        this.setOrUpdateEntry(keyObject, value as T);

        return keyObject;
    }

    /**
     * Get single entry
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    protected getEntry(
        key: StoreEntryKeySubstitute
    ): T | void {
        const keyObject = new StoreEntryKeyClass(key);

        if (!keyObject.key) {
            return;
        }

        if (!this.entryExists(keyObject)) {
            return;
        }

        // retrieve entry
        let entry: IStoreEntry<T>;
        if (keyObject.namespace) {
            entry = this.namespaceStore[keyObject.namespace][keyObject.key];
        } else {
            entry = this.store[keyObject.key];
        }
        return entry.history[entry.currentStep];
    }

    /**
     * Delete single entry, returns its current value
     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    protected deleteEntry(
        key: StoreEntryKeySubstitute
    ): T | void {
        const keyObject = new StoreEntryKeyClass(key);

        if (!keyObject.key) {
            return;
        }

        if (!this.entryExists(keyObject)) {
            return;
        }

        // get entry value and delete entry form store
        let entry: IStoreEntry<T>;

        // if entry in namespace
        if (keyObject.namespace && keyObject.key) {
            entry = this.namespaceStore[keyObject.namespace][keyObject.key];
            return entry.history[entry.currentStep];
        } else if (keyObject.namespace) {
            // if only namespace provided
            delete this.namespaceStore[keyObject.namespace];
            return;
        } else {
            entry = this.store[keyObject.key];
            return entry.history[entry.currentStep];
        }
    }

    /**
     * Set or update value in store
     * @param {StoreEntryKeyClass} key
     * @param {any} value
     * @return {boolean}
     */
    protected setOrUpdateEntry(key: StoreEntryKeyClass, value: T): void {
        // if entry does not exist in store
        if (!this.entryExists(key)) {
            const entry = new StoreEntryClass<T>(value);
            if (key.namespace) {
                this.namespaceStore[key.namespace] = {[key.key]: entry};
            } else {
                this.store[key.key] = entry;
            }
        } else {
            // if entry exist in store
            if (key.namespace) {
                this.namespaceStore[key.namespace][key.key].update(value);
            } else {
                this.store[key.key].update(value);
            }
        }
    }
}
