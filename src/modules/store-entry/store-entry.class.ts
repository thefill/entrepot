import {IStoreEntry} from "../store";

/**
 * Single store entry
 */
export class StoreEntryClass<T = any> implements IStoreEntry {
    // TODO: emit changes from single entry??
    // current step in history we are on
    public currentStep: number = 0;
    // history of value
    public history: T[] = [];

    constructor(value: T) {
        this.history.push(value);
    }

    /**
     * Update history with new value, if current step not the last index
     * of history all entries past this point are removed
     * @param {T} value
     * @returns {number} Current step value
     */
    public update(value: T): number {
        // Remove all entries that are in front of current step
        this.history = this.history.slice(0, this.currentStep);
        return this.history.push(value);
    }
}
