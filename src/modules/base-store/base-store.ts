import {IStoreEntry, StoreEntry} from '../store-entry';
import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';
import {Utils} from '../utils';
import {
    IBaseStore,
    IBaseStoreConfig,
    IInternalNamespaceStore,
    IInternalStore,
    initialValues
} from './base-store.interface';

/**
 * MAin store functions
 */
export class BaseStore<T = any> implements IBaseStore<T> {
    // TODO: implement: persistTime: number - worker to clean records
    // initial values
    public initialValues?: initialValues<T>;

    // Main base-store
    protected store: IInternalStore<T> = {};
    // Main namespace base-store
    protected namespaceStore: IInternalNamespaceStore<T> = {};

    /**
     * Constructor
     * @param {IBaseStoreConfig<T>} config
     */
    constructor(config?: IBaseStoreConfig<T>) {
        if (config) {
            // if values provided
            if (Array.isArray(config.initialValues) && config.initialValues.length) {
                // hydrate base-store with values
                this.set(config.initialValues);
            }

            delete config.initialValues;
        }
    }

    /**
     * Check if namespace, entry in namespace or entry alone exists
     * @param {StoreEntryKeySubstitute} key
     * @returns {boolean}
     */
    public exists(key: StoreEntryKeySubstitute): boolean {
        const keyObject = new StoreEntryKey(key);

        return this.entryExists(keyObject);
    }

    /**
     * Reset:
     *  - whole base-store if no params provided
     *  - namespace: if namespace name or key provided
     * @param {StoreEntryKeySubstitute} namespace
     */
    public reset(namespace?: StoreEntryKeySubstitute): void {
        // if any reference namespace provided
        if (typeof namespace !== 'undefined') {
            if (typeof namespace === 'string') {
                delete this.namespaceStore[namespace];
            } else if (namespace.namespace) {
                // if object with key provided
                delete this.namespaceStore[namespace.namespace];
            }
        } else {
            // reset whole base-store
            this.store = {};
            this.namespaceStore = {};
        }
    }

    /**
     * Set single or multiple entries, returns access key
     * @param {StoreEntryKeySubstitute | Array<{key: StoreEntryKeySubstitute; value: T}>} key
     * @param {T} value
     * @returns {StoreEntryKey | void | Array<StoreEntryKey | void>}
     */
    public set(
        key: StoreEntryKeySubstitute | Array<{ key: StoreEntryKeySubstitute, value: T }>,
        value?: T
    ): StoreEntryKey | void | Array<StoreEntryKey | void> {
        // if multiple entries to create
        if (Array.isArray(key)) {
            return key.map((setConfig) => {
                return this.setEntry(setConfig.key, setConfig.value);
            });
        } else {
            return this.setEntry(key, value);
        }
    }

    /**
     * Get single or multiple entries
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @param {number} position
     * @returns {void | Array<void | T> | T}
     */
    public get(
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[],
        position?: number
    ): T | void | Array<T | void> {
        // if multiple entries to retrieve
        if (Array.isArray(key)) {
            return key.map((singleKey) => {
                return this.getEntryValue(singleKey, position);
            });
        } else {
            return this.getEntryValue(key, position);
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
        // if multiple entries to delete
        if (Array.isArray(key)) {
            return key.map((singleKey) => {
                return this.deleteEntry(singleKey);
            });
        } else {
            return this.deleteEntry(key);
        }
    }

    /**
     * Check if namespace, entry in namespace or entry alone exists
     * @param {StoreEntryKey} key
     * @returns {boolean}
     */
    protected entryExists(key: StoreEntryKey): boolean {
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
     * Set single entry
     * @param {StoreEntryKeySubstitute} key
     * @param {T} value
     * @return {StoreEntryKey | void}
     */
    protected setEntry(
        key: StoreEntryKeySubstitute,
        value?: T
    ): StoreEntryKey | void {
        const keyObject = new StoreEntryKey(key);

        if (!keyObject.key) {
            return;
        }

        // we don't pass undefined values to the base-store
        if (typeof value === 'undefined') {
            return;
        }

        value = Utils.decoupleValue(value);
        this.setOrUpdateEntry(keyObject, value as T);

        return keyObject;
    }

    /**
     * Get single entry
     * @param {StoreEntryKeySubstitute} key
     * @returns {IStoreEntry<T> | void}
     */
    protected getEntry(
        key: StoreEntryKeySubstitute
    ): IStoreEntry<T> | void {
        const keyObject = new StoreEntryKey(key);

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

        return entry;
    }

    /**
     * Get single entry value
     * @param {StoreEntryKeySubstitute} key
     * @param {number} position
     * @returns {void | T}
     */
    protected getEntryValue(
        key: StoreEntryKeySubstitute,
        position?: number
    ): T | void {
        // retrieve entry
        const entry = this.getEntry(key);

        if (!entry) {
            return;
        }

        if (typeof position === 'number') {
            return entry.history[position];
        }

        return entry.history[entry.currentPosition];
    }

    /**
     * Delete single entry, returns its current value
     * @param {string | IStoreEntryKeyConfig | StoreEntryKey} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    protected deleteEntry(
        key: StoreEntryKeySubstitute
    ): T | void {
        const keyObject = new StoreEntryKey(key);

        if (!keyObject.key) {
            return;
        }

        if (!this.entryExists(keyObject)) {
            return;
        }

        // get entry value and delete entry form base-store
        let entry: IStoreEntry<T>;
        let value: T;

        // if entry in namespace
        if (keyObject.namespace && keyObject.key) {
            entry = this.namespaceStore[keyObject.namespace][keyObject.key];
            value = entry.history[entry.currentPosition];

            delete this.namespaceStore[keyObject.namespace][keyObject.key];
            return value;
        } else if (keyObject.namespace) {
            // if only namespace provided
            delete this.namespaceStore[keyObject.namespace];
            return;
        } else {
            entry = this.store[keyObject.key];
            value = entry.history[entry.currentPosition];

            delete this.store[keyObject.key];
            return value;
        }
    }

    /**
     * Set or update value in base-store
     * @param {StoreEntryKey} key
     * @param {any} value
     */
    protected setOrUpdateEntry(key: StoreEntryKey, value: T): void {
        // if entry does not exist in base-store
        if (!this.entryExists(key)) {
            const entry = new StoreEntry<T>(value);
            if (key.namespace) {
                // if namespace exist preserve its content
                if (this.namespaceStore[key.namespace]) {
                    this.namespaceStore[key.namespace][key.key] = entry;
                } else {
                    // create new namespace entry
                    this.namespaceStore[key.namespace] = {[key.key]: entry};
                }
            } else {
                this.store[key.key] = entry;
            }
        } else {
            // if entry exist in base-store
            if (key.namespace) {
                this.updateEntry(this.namespaceStore[key.namespace][key.key], value);
            } else {
                this.updateEntry(this.store[key.key], value);
            }
        }
    }

    /**
     * Update single entry
     * @param {StoreEntry} entry
     * @param {T} value
     * @return {number}
     */
    protected updateEntry(entry: StoreEntry, value: T): void {
        entry.history = [value];
        entry.currentPosition = 0;
    }
}
