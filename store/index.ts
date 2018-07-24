import {StoreEntryKey} from "./store-entry-key";

export interface IStoreEntryConfig {
    namespace?: string;
    key?: string;
    // history?: boolean;
    // historyLimit?: number;
    // Schema: json schema
    // persistTime: number
    // debounceEmit
    // keepForwardHistory
}

export interface IStoreEntry {
    currentStep: number;
    history: any[]
}

export class Store {

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
    // TODO: automatic documentation via http://typedoc.org/guides/doccomments/

    private static decoupleValue(value: any): any {
        if (!value) {
            return value;
        }

        if (Array.isArray(value)) {
            return value.slice();
        } else if (typeof value === 'object') {
            return Object.assign({}, value);
        }

        return value;
    }

    protected store: { [namespace: string]: IStoreEntry | { [key: string]: IStoreEntry } } = {};

    public set(key: string | IStoreEntryConfig, value?: any): StoreEntryKey | void {

        const keyObject = new StoreEntryKey(key);

        if (!keyObject.key) {
            return;
        }

        value = Store.decoupleValue(value);

        this.setOrUpdate(keyObject, value);

        return this.setOrUpdate(keyObject, value) ? keyObject;
    }

    public setOrUpdate(key: StoreEntryKey, value: any): boolean {
        if (!this.entryExists(key)) {
            return false;
        }

        if (key.namespace) {
            this.store[key.namespace] = {[key.key]: value};
        } else {
            this.store[key.key] = value;
        }

        return true;
    }

    public entryExists(key: StoreEntryKey): boolean {
        if (key.namespace) {
            return !!(this.store[key.namespace] && this.store[key.key]);
        } else {
            return !!this.store[key.key];
        }
    }

    /**
     * G
     * @param {string | IStoreEntryConfig | StoreEntryKey} key
     * @returns {void | T}
     */
    public get<T>(key: string | IStoreEntryConfig | StoreEntryKey): T | void {
        if (!key) {
            return;
        }

        let keyValue;
        let namespaceValue;

        if (typeof key === 'string') {
            keyValue = key;
        } else {
            keyValue = key.key;
            namespaceValue = key.namespace;
        }

        if (!keyValue) {
            return;
        }

        return namespaceValue ? this.store[namespaceValue][keyValue] : this.store[keyValue];
    }

}
