import {IInternalNamespaceStore, IInternalStore} from '../base-store';

/**
 * Snapshot of the whole base-store state - includes namespaces and single values
 */
export interface IStoreSnapshot<T> {
    namespaceStore: IInternalNamespaceStore<T>;
    store: IInternalStore<T>;
}

export interface IBackup<T> {
    snapshot: () => IStoreSnapshot<T>;
}
