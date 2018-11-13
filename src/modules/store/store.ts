import {Backup, IBackup, IStoreSnapshot} from '../backup';
import {HistoryStore} from '../history-store';
import {ISearch, Search} from '../search';
import {StoreEntryKey} from '../store-entry-key';
import {Utils} from '../utils';

class HybridStore<T = any> extends HistoryStore<T> implements IBackup<T>, ISearch<T> {
    // TODO: automatic docs via http://typedoc.org/guides/doccomments/

    public snapshot: () => IStoreSnapshot<T>;
    public find: (SearchCallback) => T | void;
    public findKey: (SearchCallback) => StoreEntryKey | void;
    public findAll: (SearchCallback) => void | Array<T | void>;
    public findAllKeys: (SearchCallback) => void | Array<StoreEntryKey | void>;
}

Utils.mixin(HybridStore, [Backup, Search]);

export {HybridStore as Store};
