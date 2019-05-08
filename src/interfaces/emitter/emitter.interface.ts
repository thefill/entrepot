import {EventTypes} from '../../enums';

export interface IEmitter {
    defaultListenerKey: string;
    emitterEnabled: boolean;

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

    removeAllListeners(): void;
}

/**
 * Emitter constructor config
 */
export interface IEmitterConfig {
    emitterEnabled?: boolean;
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
