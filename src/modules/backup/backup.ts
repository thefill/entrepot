import {IStoreSnapshot} from './backup.interface';
import {IInternalNamespaceStore, IInternalStore} from '../base-store';
import {Utils} from '../utils';
import {IBaseStore} from '../base-store';

/**
 * Search functionality for the store
 */
export abstract class Backup<T = any> implements IBaseStore<T> {
    public abstract exists;
    public abstract reset;
    public abstract set;
    public abstract get;
    public abstract delete;
    protected abstract namespaceStore;
    protected abstract store;

    /**
     * Returns whole base-store snapshot
     * @returns {IStoreSnapshot<T>}
     */
    public snapshot(): IStoreSnapshot<T> {
        const namespaceStore: IInternalNamespaceStore<T> = {};
        const store: IInternalStore<T> = this.getStoreSnapshot(this.store);

        Object.keys(this.namespaceStore).forEach((namespaceStoreKey) => {
            namespaceStore[namespaceStoreKey] = this.getStoreSnapshot(
                this.namespaceStore[namespaceStoreKey]
            );
        });

        return {
            namespaceStore: namespaceStore,
            store: store
        };
    }

    /**
     * Get single base-store snapshot
     * @param {IInternalStore<T>} originalStore
     * @returns {IInternalStore<T>}
     */
    protected getStoreSnapshot(originalStore: IInternalStore<T>): IInternalStore<T> {

        const singleStore: IInternalStore<T> = {};

        Object.keys(originalStore).forEach((storeKey) => {
            singleStore[storeKey] = {
                currentPosition: originalStore[storeKey].currentPosition,
                history: Utils.decoupleValue(originalStore[storeKey].history)
            };
        });

        return singleStore;
    }
}
