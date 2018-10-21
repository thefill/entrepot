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
    SET_NAMESPACE = 'setNamespace',
    DELETE_NAMESPACE = 'deleteNamespace',
    UPDATE_NAMESPACE = 'updateInNamespace'
}
