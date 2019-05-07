import {EventTypes, IEmitter, IEventStore, StoreEventListener} from './emitter.interface';

/**
 * Event emitting functionality for the store.
 */
export abstract class Emitter implements IEmitter {
    // TODO: implement: debounceEmit

    /**
     * Remove listener for the event from generic event store
     * @param {IEventStore} store
     * @param {string} event
     * @param {string} listenerKey
     * @param {StoreEventListener} listener
     */
    protected static removeListenersFromStore(
        store: IEventStore,
        event: EventTypes,
        listenerKey: string,
        listener?: StoreEventListener
    ): void{
        if (typeof store[event] !== 'object'){
            return;
        }

        if (!Array.isArray(store[event][listenerKey])){
            return;
        }

        // if listener function provided we will remove for this listener only
        if (listener){
            const index: number = store[event][listenerKey].indexOf(listener);
            if (index === -1){
                return;
            }
            store[event][listenerKey].splice(index, 1);
        }

        // if no more listeners for key / namespace or event do cleanup
        if (!store[event][listenerKey].length || !listener){
            delete store[event][listenerKey];
        }
        if (store[event] && !Object.keys(store[event]).length){
            delete store[event];
        }
    }

    /**
     * Add listener for the event to generic event store
     * @param {IEventStore} store
     * @param {string} event
     * @param {string} listenerKey
     * @param {StoreEventListener} listener
     */
    protected static addListenerToStore(
        store: IEventStore,
        event: EventTypes,
        listenerKey: string,
        listener: StoreEventListener
    ): void{
        // set container for event
        if (typeof store[event] !== 'object'){
            store[event] = {};
        }

        // set container for event listener
        if (!Array.isArray(store[event][listenerKey])){
            store[event][listenerKey] = [];
        }

        store[event][listenerKey].push(listener);
    }

    /**
     * Execute listeners for event in generic event store
     * @param {IEventStore} store
     * @param {EventTypes} event
     * @param {string} listenerKey
     * @param {any[]} args
     */
    protected static emitForStore(
        store: IEventStore,
        event: EventTypes,
        listenerKey: string,
        args: any[]
    ): void{
        const listeners = Emitter.getListenersFromStore(store, event, listenerKey);

        listeners.forEach((listener) => listener.apply(this, [event, listenerKey, ...args]));
    }

    /**
     * Retrieve listeners in the generic event store
     * @param {IEventStore} store
     * @param {EventTypes} event
     * @param {string} listenerKey
     * @returns {StoreEventListener[]}
     */
    protected static getListenersFromStore(
        store: IEventStore,
        event: EventTypes,
        listenerKey: string
    ): StoreEventListener[]{

        if (typeof store[event] !== 'object'){
            return [];
        }

        if (!Array.isArray(store[event][listenerKey])){
            return [];
        }

        return store[event][listenerKey];
    }

    // Default key used to group listeners
    public abstract defaultListenerKey: string;

    // Multiple usage event store
    protected events: IEventStore = {};
    // Single usage event store
    protected onceEvents: IEventStore = {};

    /**
     * Register listener for specific event
     * @param {EventTypes} event
     * @param {string} listenerKey
     * @param {StoreEventListener} listener
     */
    public on(
        event: EventTypes = EventTypes.ALL,
        listener: StoreEventListener,
        listenerKey: string = this.defaultListenerKey
    ): void{
        Emitter.addListenerToStore(this.events, event, listenerKey, listener);
    }

    /**
     * Register single-use listener for specific event
     * @param {EventTypes} event
     * @param {StoreEventListener} listener
     * @param {string} listenerKey
     */
    public once(
        event: EventTypes = EventTypes.ALL,
        listener: StoreEventListener,
        listenerKey: string = this.defaultListenerKey
    ): void{
        Emitter.addListenerToStore(this.onceEvents, event, listenerKey, listener);
    }

    /**
     * Remove listener for the event from all event stores
     * @param {EventTypes} event
     * @param {StoreEventListener} listener
     * @param {string} listenerKey
     */
    public removeListener(
        event: EventTypes,
        listener: StoreEventListener,
        listenerKey: string = this.defaultListenerKey
    ): void{
        Emitter.removeListenersFromStore(this.events, event, listenerKey, listener);
        Emitter.removeListenersFromStore(this.onceEvents, event, listenerKey, listener);
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
     * @param {string} listenerKey
     * @param args
     */
    protected emit(
        event: EventTypes,
        listenerKey: string = this.defaultListenerKey,
        ...args: any[]
    ): void{
        Emitter.emitForStore(this.events, event, listenerKey, args);
        Emitter.emitForStore(this.onceEvents, event, listenerKey, args);

        // remove listeners for event from single-usage store
        Emitter.removeListenersFromStore(this.onceEvents, event, listenerKey);
    }
}
