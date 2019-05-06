import {StoreEntryKey} from './store-entry-key';

/**
 * Config for newly created base-store entry
 */
export interface IStoreEntryKeyConfig {
    // Group values under namespace, unique
    namespace?: string;
    // id of an entry, unique per namespaces, unique if outside namespaces (global namespace)
    key: string;
}

/**
 * Possible values used to get / set / delete values from the base-store
 */
export type StoreEntryKeySubstitute = string | IStoreEntryKeyConfig | StoreEntryKey;
