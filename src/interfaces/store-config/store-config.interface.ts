export interface IStoreConfig<K = any, V = any> {
    entries?: ReadonlyArray<[K, V]> | null;
    history?: boolean;
    events?: boolean;
    actions?: boolean;
    schema?: boolean;
    worker?: boolean;
}
