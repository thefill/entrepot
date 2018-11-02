import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';
import {EventTypes, IEventStore, StoreEventListener} from './emitter.interface';

/**
 * Event emitting functionality for the store.
 */
export class Emitter {

    // TODO: implement: debounceEmit

    // Key used to group listeners for any key
    protected static anyKeyOrNamespace = new StoreEntryKey({
        namespace: '__ANY__',
        key: '__ANY__'
    });

    /**
     * Remove listener for the event from generic event store
     * @param {IEventStore} store
     * @param {string} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    protected static removeListenerFromStore(
        store: IEventStore,
        event: EventTypes,
        listener: StoreEventListener,
        keyOrNamespace: StoreEntryKeySubstitute,
    ): void{
        // set container for event
        if (typeof store[event] !== 'object'){
            return;
        }

        const keyObject = new StoreEntryKey(keyOrNamespace);

        // set inner key for key/namespace as namespace_key
        const listenerKey = Emitter.buildListenerKey(keyObject);

        // set container for event listener
        if (!Array.isArray(store[event][listenerKey])){
            return;
        }

        const index: number = store[event][listenerKey].indexOf(listener);
        if (index === -1){
            return;
        }
        store[event][listenerKey].splice(index, 1);

        // if no more listeners for key/ namespace or event cleanup
        if (!store[event][listenerKey].length){
            if (!Object.keys(store[event].length)){
                delete store[event];
            } else {
                delete store[event][listenerKey];
            }
        }

        store[event][listenerKey].push(listener);
    }

    /**
     * Remove all listeners for the event from generic event store
     * @param {IEventStore} store
     * @param {string} event
     * @param {StoreEntryKey} keyObject
     */
    protected static removeListenersFromStore(
        store: IEventStore,
        event: EventTypes,
        keyObject: StoreEntryKey
    ): void{
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
        event: EventTypes,
        listener: StoreEventListener,
        keyOrNamespace: StoreEntryKeySubstitute
    ): void{
        const keyObject = new StoreEntryKey(keyOrNamespace);
        // TODO: resolve key/namespace name
        // TODO: resolve event.ALL && no key/namespace

        // set container for event
        if (typeof store[event] !== 'object'){
            store[event] = {};
        }

        // set inner key for key/namespace as namespace_key
        const listenerKey = Emitter.buildListenerKey(keyObject);

        // set container for event listener
        if (!Array.isArray(store[event][listenerKey])){
            store[event][listenerKey] = [];
        }

        store[event][listenerKey].push(listener);
    }

    /**
     * Builds listener identifier from provided object key
     * @param {StoreEntryKey} keyObject
     * @return {string}
     */
    protected static buildListenerKey(
        keyObject: StoreEntryKey
    ): string {
        return keyObject.namespace ? `${keyObject.namespace}_${keyObject.key}` : keyObject.key;
    }

    /**
     * Execute listeners for event in generic event store
     * @param {IEventStore} store
     * @param {EventTypes} event
     * @param {StoreEntryKey} entryKey
     * @param {any[]} args
     */
    protected static emitForStore(
        store: IEventStore,
        event: EventTypes,
        entryKey: StoreEntryKey,
        args: any[]
    ): void{
        const listeners = Emitter.getListenersFromStore(store, event, entryKey);

        listeners.forEach((listener) => listener.apply(this, [event, entryKey, ...args]));
    }

    /**
     * Retrieve listeners in the generic event store
     * @param {IEventStore} store
     * @param {EventTypes} event
     * @param {StoreEntryKey} entryKey
     * @returns {StoreEventListener[]}
     */
    protected static getListenersFromStore(
        store: IEventStore,
        event: EventTypes,
        entryKey: StoreEntryKey
    ): StoreEventListener[]{
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
        listener: StoreEventListener,
        keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
    ): void{
        Emitter.addListenerToStore(this.events, event, listener, keyOrNamespace);
    }

    /**
     * Register single-use listener for specific event
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    public once(
        event: EventTypes = EventTypes.ALL,
        listener: StoreEventListener,
        keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
    ): void{
        Emitter.addListenerToStore(this.events, event, listener, keyOrNamespace);
    }

    /**
     * Remove listener for the event from all event stores
     * @param {EventTypes} event
     * @param {StoreEntryKeySubstitute | void} keyOrNamespace
     * @param {StoreEventListener} listener
     */
    public removeListener(
        event: EventTypes,
        listener: StoreEventListener,
        keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
    ): void{
        Emitter.removeListenerFromStore(this.events, event, listener, keyOrNamespace);
        Emitter.removeListenerFromStore(this.onceEvents, event, listener, keyOrNamespace);
    }

    /**
     * Remove all listeners for all events from all event stores
     */
    public removeAllListeners(): void{
        this.events = {};
        this.onceEvents = {};
    }

    /**
     * Emit events
     * @param {EventTypes} event
     * @param {StoreEntryKey} key
     * @param args
     */
    protected emit(
        event: EventTypes,
        key: StoreEntryKey,
        ...args: any[]
    ): void{
        Emitter.emitForStore(this.events, event, key, args);
        Emitter.emitForStore(this.onceEvents, event, key, args);

        // remove listeners for event from single-usage store
        Emitter.removeListenersFromStore(this.onceEvents, event, key);
    }
}
