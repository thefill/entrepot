export interface IMappedStore<K, V> {
    // backup
    snapshot(): Array<[K, V]>;

    // // events
    // on
    // once
    // removeListener
    // addListener
    // removeAllListeners
    // emit
    // // search
    //     find: (SearchCallback) => T | void;
    // findKey: (SearchCallback) => StoreEntryKey | void;
    // findAll: (SearchCallback) => void | Array<T | void>;
    // findAllKeys: (SearchCallback) => void | Array<StoreEntryKey | void>;
    // // history
    // history
    // undo
    // redo
    // getPosition
    // setPosition
}
