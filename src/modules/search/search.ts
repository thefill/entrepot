import {ISearch} from './search.interface';
import {StoreEntryKey} from '../store-entry-key';

/**
 * Search functionality for the store
 */
export abstract class Search<T = any> implements ISearch<T> {
    public abstract exists;
    public abstract reset;
    public abstract set;
    public abstract get;
    public abstract delete;
    protected abstract namespaceStore;
    protected abstract store;

    // TODO: implement: filter
    // TODO: implement: map
    // TODO: implement: forEach
    // TODO: introduce find and findAll functions that accepts callback or value to seek + optional namespace
    public find(SearchCallback): T | void {
        return;
    }

    public findKey(SearchCallback): StoreEntryKey | void {
        return;
    }

    public findAll(SearchCallback): void | Array<T | void> {
        return;
    }

    public findAllKeys(SearchCallback): void | Array<StoreEntryKey | void> {
        return;
    }

}
