import {StoreEntryKeySubstitute} from '../store-entry-key';
import {StoreEntry} from '../store-entry';
import {IHistoryStore, IHistoryStoreConfig} from './history-store.interface';
import {BaseStore, IBaseStore} from '../base-store';

/**
 * Base base-store class
 */
export class HistoryStore<T = any> extends BaseStore<T> implements IHistoryStore<T>, IBaseStore<T> {
    // keep history of entry values
    public keepHistory: boolean = true;
    // count of entry values stored, inclusive of limit
    public limitHistory: number = 0;
    // if current position in the middle of history preserve forward entries, push new value after current one
    // e.g. 10 records in the history, current position is 5 (6th entry), we push new change:
    //  - if keepForwardHistory true we will put new value after position 5 (11 records left)
    //  - if keepForwardHistory false we will put new value after position 5 and remove other records (7 records left)
    public keepForwardHistory: boolean = false;

    constructor(config?: IHistoryStoreConfig<T>) {
        super(config);
        Object.assign(this, config);
    }

    /**
     * Get history
     * @param {StoreEntryKeySubstitute} key
     * @return {T[] | void}
     */
    public history(key: StoreEntryKeySubstitute): T[] | void {
        const entry = this.getEntry(key);

        if (!entry) {
            return;
        }

        return entry.history.slice();
    }

    /**
     * Get current position in history stack
     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key
     * @returns {void | Array<void | T> | T}
     */
    public position(
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ): number | void | Array<number | void> {
        // if request to get step for multiple entries
        if (Array.isArray(key)) {
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
     * Move back in history if possible
     * @param {StoreEntryKeySubstitute} key
     * @param {number} positionCount
     * @returns {void | T}
     */
    public undo(key: StoreEntryKeySubstitute, positionCount: number = 1): T | void {
        const entry = this.getEntry(key);

        if (!entry) {
            return;
        }

        // if not at the begin of the history stack
        if (entry.currentPosition > 0) {
            if (entry.currentPosition - positionCount >= 0) {
                entry.currentPosition -= positionCount;
            } else {
                entry.currentPosition = 0;
            }
        }

        return entry.history[entry.currentPosition];
    }

    /**
     * Move forward in history if possible
     * @param {StoreEntryKeySubstitute} key
     * @param {number} positionCount
     * @returns {void | T}
     */
    public redo(key: StoreEntryKeySubstitute, positionCount: number = 1): T | void {
        const entry = this.getEntry(key);

        if (!entry) {
            return;
        }

        // if not at the end of the history stack
        if (entry.currentPosition < entry.history.length - 1) {
            if (entry.currentPosition + positionCount <= entry.history.length - 1) {
                entry.currentPosition += positionCount;
            } else {
                entry.currentPosition = entry.history.length - 1;
            }
        }

        return entry.history[entry.currentPosition];
    }

    /**
     * Update single entry
     * @param {StoreEntry} entry
     * @param {T} value
     * @return {number}
     */
    protected updateEntry(entry: StoreEntry, value: T): void {
        // If history enabled add to the history stack
        if (this.keepHistory) {
            const resolvedHistory = this.resolveHistory(entry, value);
            entry.history = resolvedHistory.outputHistory;
            entry.currentPosition = resolvedHistory.currentPosition;
        } else {
            super.updateEntry(entry, value);
        }
    }

    /**
     * Produces updated history and evaluates current position
     * @param {StoreEntry} entry
     * @param {T} value
     * @return {{outputHistory: any[]; currentPosition: number}}
     */
    protected resolveHistory(entry: StoreEntry, value: T): { outputHistory: any[], currentPosition: number } {
        const currentHistory = entry.history.slice();
        let outputHistory: any[];
        let currentPosition = entry.currentPosition;

        // if we preserve forward history entries
        // and if current position in the middle of history stack
        if (
            this.keepForwardHistory &&
            (currentPosition + 1 < currentHistory.length)
        ) {
            // inject new value
            currentHistory.splice(entry.currentPosition, 0, value);
            outputHistory = currentHistory;
            currentPosition = currentPosition + 1;
        } else {
            // if current step not the last index all of history all entries past this point are removed
            // Remove all entries that are in front of current step
            outputHistory = currentHistory.slice(0, currentPosition + 1);
            currentPosition = outputHistory.push(value) - 1;
        }

        // if history over the limit
        if (this.limitHistory && outputHistory.length > this.limitHistory) {
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
