import {IStoreEntry} from './store-entry.interface';

/**
 * Single base-store entry
 */
export class StoreEntry<T = any> implements IStoreEntry {
    // current step in history we are on
    public currentPosition: number = 0;
    // history of value
    public history: T[] = [];

    constructor(value: T) {
        this.history.push(value);
    }
}
