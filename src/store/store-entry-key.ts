import {IStoreEntryConfig} from "./index";

export class StoreEntryKey {
    public namespace: string;
    public key: string;

    constructor(key: string | IStoreEntryConfig){

        if(typeof key === 'string'){
            this.key = key;
            return;
        } else if(key.key){
            this.key = key.key;
        }

        if (!this.key) {
            return;
        }

        if (key.namespace){
            this.namespace = key.namespace;
        }
    }
}