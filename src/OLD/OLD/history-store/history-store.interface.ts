import {StoreEntryKeySubstitute} from '../store-entry-key';
import {IBaseStoreConfig} from '../base-store';

export interface IHistoryStore<T> extends IHistoryStoreConfig<T> {
    history: (key: StoreEntryKeySubstitute) => T[] | void;
    undo: (key: StoreEntryKeySubstitute, positionCount: number) => T | void;
    redo: (key: StoreEntryKeySubstitute, positionCount: number) => T | void;
    position: (
        key: StoreEntryKeySubstitute | StoreEntryKeySubstitute[]
    ) => number | void | Array<number | void>;
}

/**
 * Config for the history store
 */
export interface IHistoryStoreConfig<T = any> extends IBaseStoreConfig {
    keepHistory?: boolean;
    limitHistory?: number;
    keepForwardHistory?: boolean;
}
