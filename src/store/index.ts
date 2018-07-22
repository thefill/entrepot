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
    value: any;
}

export class Store {

    private static decoupleValue(value: any): any {
        if (!value) {
            return value;
        }

        if(Array.isArray(value)) {
            return value.slice();
        } else if (typeof value === 'object') {
            return Object.assign({}, value);
        }

        return value;
    }

    protected store: {[namespace: string]:IStoreEntry | {[key: string]:IStoreEntry}} = {};

    public set(key: string | IStoreEntryConfig, value?: any): StoreEntryKey | void {

        key = new StoreEntryKey(key);

        if (!key.key) {
            return;
        }

        value = Store.decoupleValue(value);

        if(key.namespace){
            this.store[key.namespace] = {[key.key]: value};
        } else {
            this.store[key.key] = value;
        }

        // TODO: emit change
    }

    // TODO: get history list
    // TODO: get history length
    // TODO: get history list with values
    // TODO: move back in time x steps
    // TODO: get value from x step
    // TODO: move back in time to prev
    // TODO: move back in time to next (if keep forward)


    public get<T>(key: string | IStoreEntryConfig | StoreEntryKey): T | void {
        if (!key) {
            return ;
        }

        let keyValue;
        let namespaceValue;

        if(typeof key === 'string'){
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
