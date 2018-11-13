/**
 * Event callback function
 */
import {StoreEntryKey} from '../store-entry-key';

export type StoreEventListener = (
    eventType: EventTypes,
    keyOrNamespace: StoreEntryKey | string | void,
    ...args: any[]
) => any | void;

export interface IEventStoreEntry {
    [keyOrNamespace: string]: StoreEventListener[];
}

/**
 * Event store
 */
export interface IEventStore {
    [event: string]: IEventStoreEntry;
}

/**
 * Types of store events
 */
export enum EventTypes {
    ALL = 'all',
    SET = 'set',
    UPDATE = 'update',
    DELETE = 'delete',
    ALL_IN_NAMESPACE = 'allInNamespace',
    SET_IN_NAMESPACE = 'setInNamespace',
    DELETE_IN_NAMESPACE = 'deleteInNamespace',
    UPDATE_IN_NAMESPACE = 'updateInNamespace'
}
