import {IStoreEntry} from "../store";

/**
 * Single store entry
 */
export class StoreEntryClass<T = any> implements IStoreEntry {
    // current step in history we are on
    public currentPosition: number = 0;
    // history of value
    public history: T[] = [];

    constructor(value: T){
        this.history.push(value);
    }
}
