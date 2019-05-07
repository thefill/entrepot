export interface IEmitter {
    defaultListenerKey: string;

    on(
        event: EventTypes,
        listener: StoreEventListener,
        listenerKey: string
    ): void;

    once(
        event: EventTypes,
        listener: StoreEventListener,
        listenerKey: string
    ): void;

    removeListener(
        event: EventTypes,
        listener: StoreEventListener,
        listenerKey: string
    ): void;

    removeAllListeners(): void
}

/**
 * Event callback function
 */
export type StoreEventListener = (
    eventType: EventTypes,
    listenerKey: string | void,
    ...args: any[]
) => any | void;

export interface IEventStoreEntry {
    [listenerKey: string]: StoreEventListener[];
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
