import { IStoreEntry } from "./store.interface";
/**
 * Single store entry
 */
export declare class StoreEntryClass<T = any> implements IStoreEntry {
    currentStep: number;
    history: T[];
    constructor(value: T);
    /**
     * Update history with new value, if current step not the last index
     * of history all entries past this point are removed
     * @param {T} value
     * @returns {number} Current step value
     */
    update(value: T): number;
}
