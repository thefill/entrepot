import {StoreEntryClass} from '../store-entry';
import {StoreEntryKeyClass} from '../store-entry-key';
import {UtilsClass} from '../utils';
import {
    IInternalNamespaceStore,
    IInternalStore,
    IStoreConfig,
    IStoreEntry,
    StoreEntryKeySubstitute
} from './store.interface';

/**
 * Main store class
 */
export class Store<T = any> implements IStoreConfig<T> {
    // TODO: move back in time x steps
    // TODO: get value from x step
    // TODO: move back in time to prev
    // TODO: move back in time to next (if keep forward)
    // TODO: introduce find and findAll functions that accepts callback or value to seek + optional namespace
    // TODO: emit change
    // TODO: automatic docs via http://typedoc.org/guides/doccomments/
    // TODO: introduce worker store!! ;-D (separate class that spawns store as a worker and communicate with it)
    // TODO: emit changes from single entry??
    // TODO: get store snapshot not whole store: {namespace: {key: value}...}
    // TODO: add benchmark of read/write to the tests

    // history enabled, by default enabled
    public readonly keepHistory = true;
    // history limit, by default no limit
    public readonly limitHistory = 0;
    // should we remove history entries in front of current position, by default disabled
    public readonly keepForwardHistory = false;

    // Main store
    protected store: IInternalStore<T> = {};
    // Main namespace store
    protected namespaceStore: IInternalNamespaceStore<T> = {};

    /**
     * Constructor
     * @param {IStoreConfig<T>} config
     */
    constructor(config?: IStoreConfig<T>){
        if (config){
            // if values provided
            if (Array.isArray(config.initialValues) && config.initialValues.length){
                // hydrate store with values
                this.set(config.initialValues);
            }

            delete config.initialValues;
            Object.assign(this, config);
        }
    }

    /**
     * Get history
     * @param {StoreEntryKeySubstitute} key
     * @return {T[] | void}
     */
    public history(key: StoreEntryKeySubstitute): T[] | void {
        const entry = this.getEntry(key);

        if (!entry){
            return;
        }

        return entry.history.slice();
    }

    /**
     * Check if namespace, entry in namespace or entry alone exists
     * @param {StoreEntryKeySubstitute} key
     * @returns {boolean}
     */
    public exists(key: StoreEntryKeySubstitute): boolean{
        const keyObject = new StoreEntryKeyClass(key);

        return this.entryExists(keyObject);
    }

    /**
     * Reset:
     *  - whole store if no params provided
     *  - namespace: if namespace name or key provided
     * @param {StoreEntryKeySubstitute} namespace
     */
    public reset(namespace?: StoreEntryKeySubstitute): void{
        // if any reference namespace provided
        if (typeof namespace !== 'undefined'){
            if (typeof namespace === 'string'){
                delete this.namespaceStore[namespace];
            } else if (namespace.namespace){
                // if object with key provided
                delete this.namespaceStore[namespace.namespace];
            }
        } else {
            // reset whole store
            this.store = {};
            this.namespaceStore = {};
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
    ): StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void>{
        // if multiple entries to create
        if (Array.isArray(key)){
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
     * @returns {void | Array<void | T> | T}
     */
    public get(
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ): T | void | Array<T | void>{
        // if multiple entries to retrieve
        if (Array.isArray(key)){
            return key.map((singleKey) => {
                return this.getEntryValue(singleKey);
            });
        } else {
            return this.getEntryValue(key);
        }
    }

    /**
     * Get position number
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {void | Array<void | T> | T}
     */
    public position(
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ): number | void | Array<number | void>{
        // if request to get step for multiple entries
        if (Array.isArray(key)){
            return key.map((singleKey) => {
                const entry = this.getEntry(singleKey);
                return entry ? entry.currentPosition : undefined;
            });
        } else {
            const entry = this.getEntry(key);
            return entry ? entry.currentPosition : undefined;
        }
    }

    /**
     * Delete single or multiple entries, returns current entry value
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {T[] | void | void[] | T}
     */
    public delete(
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ): T | void | Array<T | void>{
        // if multiple entries to delete
        if (Array.isArray(key)){
            return key.map((singleKey) => {
                return this.deleteEntry(singleKey);
            });
        } else {
            return this.deleteEntry(key);
        }
    }

    /**
     * Check if namespace, entry in namespace or entry alone exists
     * @param {StoreEntryKeyClass} key
     * @returns {boolean}
     */
    protected entryExists(key: StoreEntryKeyClass): boolean{
        // if namespace and key to check
        if (key.namespace && key.key){
            return !!(this.namespaceStore[key.namespace] &&
                this.namespaceStore[key.namespace][key.key]);
        } else if (key.namespace){
            // if only namespace to check
            return !!this.namespaceStore[key.namespace];
        } else {
            // if only entry
            return !!this.store[key.key];
        }
    }

    /**
     * Get single entry current position
     * @param {string | IStoreEntryKeyConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    protected getPosition(
        key: StoreEntryKeySubstitute
    ): number | void{
        // retrieve entry
        const entry = this.getEntry(key);

        if (!entry){
            return;
        }

        return entry.currentPosition;
    }

    /**
     * Set single entry
     * @param {StoreEntryKeySubstitute} key
     * @param {T} value
     * @return {StoreEntryKeyClass | void}
     */
    protected setEntry(
        key: StoreEntryKeySubstitute,
        value?: T
    ): StoreEntryKeyClass | void{
        const keyObject = new StoreEntryKeyClass(key);

        if (!keyObject.key){
            return;
        }

        // we don't pass undefined values to the store
        if (typeof value === 'undefined'){
            return;
        }

        value = UtilsClass.decoupleValue(value);
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
    ): IStoreEntry<T> | void{
        const keyObject = new StoreEntryKeyClass(key);

        if (!keyObject.key){
            return;
        }

        if (!this.entryExists(keyObject)){
            return;
        }

        // retrieve entry
        let entry: IStoreEntry<T>;
        if (keyObject.namespace){
            entry = this.namespaceStore[keyObject.namespace][keyObject.key];
        } else {
            entry = this.store[keyObject.key];
        }

        return entry;
    }

    /**
     *
     * Get single entry value
     * @param {StoreEntryKeySubstitute} key
     * @returns {void | T}
     */
    protected getEntryValue(
        key: StoreEntryKeySubstitute
    ): T | void{
        // retrieve entry
        const entry = this.getEntry(key);

        if (!entry){
            return;
        }

        return entry.history[entry.currentPosition];
    }

    /**
     * Delete single entry, returns its current value
     * @param {string | IStoreEntryKeyConfig | StoreEntryKeyClass} key
     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}
     */
    protected deleteEntry(
        key: StoreEntryKeySubstitute
    ): T | void{
        const keyObject = new StoreEntryKeyClass(key);

        if (!keyObject.key){
            return;
        }

        if (!this.entryExists(keyObject)){
            return;
        }

        // get entry value and delete entry form store
        let entry: IStoreEntry<T>;
        let value: T;

        // if entry in namespace
        if (keyObject.namespace && keyObject.key){
            entry = this.namespaceStore[keyObject.namespace][keyObject.key];
            value = entry.history[entry.currentPosition];

            delete this.namespaceStore[keyObject.namespace][keyObject.key];
            return value;
        } else if (keyObject.namespace){
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
     * Set or update value in store
     * @param {StoreEntryKeyClass} key
     * @param {any} value
     */
    protected setOrUpdateEntry(key: StoreEntryKeyClass, value: T): void{
        // if entry does not exist in store
        if (!this.entryExists(key)){
            const entry = new StoreEntryClass<T>(value);
            if (key.namespace){
                // if namespace exist preserve its content
                if (this.namespaceStore[key.namespace]){
                    this.namespaceStore[key.namespace][key.key] = entry;
                } else {
                    // create new namespace entry
                    this.namespaceStore[key.namespace] = {[key.key]: entry};
                }
            } else {
                this.store[key.key] = entry;
            }
        } else {
            // if entry exist in store
            if (key.namespace){
                this.updateEntry(this.namespaceStore[key.namespace][key.key], value);
            } else {
                this.updateEntry(this.store[key.key], value);
            }
        }
    }

    /**
     * Update single entry
     * @param {StoreEntryClass} entry
     * @param {T} value
     * @return {number}
     */
    protected updateEntry(entry: StoreEntryClass, value: T): void{
        let outputHistory: any[];
        let currentPosition = 0;

        // If history enabled add to the history stack
        if (this.keepHistory){
            const resolvedHistory = this.resolveHistory(entry, value);
            outputHistory = resolvedHistory.outputHistory;
            currentPosition = resolvedHistory.currentPosition;
        } else {
            // if no history set only one value
            outputHistory = [value];
            currentPosition = 0;
        }

        entry.history = outputHistory;
        entry.currentPosition = currentPosition;
    }

    /**
     * Produces updated history and evaluates current position
     * @param {StoreEntryClass} entry
     * @param {T} value
     * @return {{outputHistory: any[]; currentPosition: number}}
     */
    protected resolveHistory(entry: StoreEntryClass, value: T): { outputHistory: any[], currentPosition: number }{
        const currentHistory = entry.history.slice();
        let outputHistory: any[];
        let currentPosition = entry.currentPosition;

        // if we preserve forward history entries
        // and if current position in the middle of history stack
        if (
            this.keepForwardHistory &&
            (currentPosition + 1 < currentHistory.length)
        ){
            // inject new value
            outputHistory = currentHistory.splice(entry.currentPosition, 0, value);
            currentPosition = currentPosition + 1;
        } else {
            // if current step not the last index all of history all entries past this point are removed
            // Remove all entries that are in front of current step
            outputHistory = currentHistory.slice(0, currentPosition + 1);
            currentPosition = outputHistory.push(value) - 1;
        }

        // if history over the limit
        if (this.limitHistory && outputHistory.length > this.limitHistory){
            // remove old entry and adjust position
            outputHistory.shift();
            currentPosition = currentPosition - 1;
        }

        return {
            outputHistory: outputHistory,
            currentPosition: currentPosition
        };
    }

}
