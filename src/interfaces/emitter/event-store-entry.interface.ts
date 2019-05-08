import {StoreEventListener} from './store-event-listener.interface';

export interface IEventStoreEntry {
    [listenerKey: string]: StoreEventListener[];
}
