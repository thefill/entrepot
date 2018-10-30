import {EventTypes, IEventStore, StoreEventListener} from './emitter.interface';
import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';

/**
 * Event emitting functionality for the store.
 */
export class Emitter {

    // TODO: implement: debounceEmit

    /**
     * Remove listener for the event from generic event store
     * @param {IEventStore} store
     * @param {string} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    protected static removeListenerFromStore(
        store: IEventStore,
        event: string,
        keyOrNamespace: StoreEntryKeySubstitute | void,
        listener: StoreEventListener
    ): void {
        // TODO: resolve key/namespace name/namespace name
        if (typeof store[event] === 'object') {
            const index: number = store[event].indexOf(listener);
            if (index > -1) {
                store[event].splice(index, 1);
            }
        }
    }

    /**
     * Remove all listeners for the event from generic event store
     * @param {IEventStore} store
     * @param {string} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     */
    protected static removeListenersFromStore(
        store: IEventStore,
        event: string,
        keyOrNamespace: StoreEntryKeySubstitute | void
    ): void {
        // TODO: resolve key/namespace name
        delete store[event];
    }

    /**
     * Add listener for the event to generic event store
     * @param {IEventStore} store
     * @param {string} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    protected static addListenerToStore(
        store: IEventStore,
        event: string,
        keyOrNamespace: StoreEntryKeySubstitute | void,
        listener: StoreEventListener
    ): void {
        // TODO: resolve key/namespace name
        // TODO: set inner key for key/namespace as namespace_key
        if (typeof store[event] !== 'object') {
            store[event] = {};
        }

        store[event].push(listener);
    }

    /**
     * Execute listeners for event in generic event store
     * @param {IEventStore} store
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {any[]} args
     */
    protected static emitForStore(
        store: IEventStore,
        event: EventTypes,
        keyOrNamespace: StoreEntryKeySubstitute | void,
        args: any[]
    ): void {
        const identifier = Emitter.resolveIdentifier(event, keyOrNamespace);
        const listeners = Emitter.getListenersFromStore(store, event, identifier);
        if (!Array.isArray(listeners)) {
            return;
        }

        listeners.forEach((listener) => listener.apply(this, [event, identifier, ...args]));
    }

    /**
     * Returns store key or namespace name
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @returns {StoreEntryKey | string}
     */
    protected static resolveIdentifier(
        event: EventTypes,
        keyOrNamespace: StoreEntryKeySubstitute | void
    ): StoreEntryKey | string | void {

        // TODO: implement
        return '';
    }

    /**
     * Retrieve listeners in the generic event store
     * @param {IEventStore} store
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @returns {StoreEventListener[]}
     */
    protected static getListenersFromStore(
        store: IEventStore,
        event: EventTypes,
        keyOrNamespace: StoreEntryKey | string | void
    ): StoreEventListener[] | void {
        // TODO: resolve key/namespace name
        // TODO: resolve event.ALL && no key/namespace
        return [];
    }

    // Multiple usage event store
    protected events: IEventStore = {};
    // Single usage event store
    protected onceEvents: IEventStore = {};

    /**
     * Register listener for specific event
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    public on(
        event: EventTypes,
        keyOrNamespace: StoreEntryKeySubstitute | void,
        listener: StoreEventListener
    ): void {
        Emitter.addListenerToStore(this.events, event, keyOrNamespace, listener);
    }

    /**
     * Register single-use listener for specific event
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    public once(
        event: EventTypes,
        keyOrNamespace: StoreEntryKeySubstitute | void,
        listener: StoreEventListener
    ): void {
        Emitter.addListenerToStore(this.events, event, keyOrNamespace, listener);
    }

    /**
     * Remove listener for the event from all event stores
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    public removeListener(
        event: EventTypes,
        keyOrNamespace: StoreEntryKeySubstitute | void,
        listener: StoreEventListener
    ): void {
        Emitter.removeListenerFromStore(this.events, event, keyOrNamespace, listener);
        Emitter.removeListenerFromStore(this.onceEvents, event, keyOrNamespace, listener);
    }

    /**
     * Remove all listeners for all events from all event stores
     */
    public removeAllListeners(): void {
        this.events = {};
        this.onceEvents = {};
    }

    /**
     * Emit events
     * @param {EventTypes} event
     * @param {StoreEntryKey} key
     * @param args
     */
    public emit(
        event: EventTypes,
        key: StoreEntryKey,
        ...args: any[]
    ): void {
        Emitter.emitForStore(this.events, event, key, args);
        Emitter.emitForStore(this.onceEvents, event, key, args);

        // remove listeners for event from single-usage store
        Emitter.removeListenersFromStore(this.onceEvents, event, key);
    }
}
