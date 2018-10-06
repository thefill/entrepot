import {HistoryStore} from '../history-store';
import {Backup, IBackup, IStoreSnapshot} from '../backup';
import {ISearch, Search} from '../search';
import {StoreEntryKey} from '../store-entry-key';
import {Utils} from '../utils';

class HybridStore<T = any> extends HistoryStore<T>
    implements IBackup<T>, ISearch<T> {

    public snapshot: () => IStoreSnapshot<T>;
    public find: (SearchCallback) => T | void;
    public findKey: (SearchCallback) => StoreEntryKey | void;
    public findAll: (SearchCallback) => void | Array<T | void>;
    public findAllKeys: (SearchCallback) => void | Array<StoreEntryKey | void>;

    // TODO: implement: Schema: json schema
    // TODO: emit change (using base-store-emitter)
    // TODO: implement: debounceEmit
    // TODO: use .on as sideeffects - when something happen fire
    // TODO: create global history - timeline that keeps chronological record of changes
    // across values
    // TODO: add option to backup timeline to browser storage to recreate steps
    // ---
    // TODO: implement: persistTime: number
    // TODO: introduce worker base-store!! ;-D (separate class that spawns base-store as a worker and communicate with it)
    // TODO: automatic docs via http://typedoc.org/guides/doccomments/
    // TODO: add benchmark of read/write to the tests
}

Utils.mixin(HybridStore, [Backup, Search]);

export {HybridStore as Store};
