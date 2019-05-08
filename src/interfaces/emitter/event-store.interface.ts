import {IEventStoreEntry} from './event-store-entry.interface';

/**
 * Event store
 */
export interface IEventStore {
    [event: string]: IEventStoreEntry;
}
