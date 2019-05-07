import {IMappedStore} from '../../interfaces';
import {Utils} from '../utils';

export abstract class MappedStore<K = any, V = any> extends Map<K, V> implements IMappedStore<K, V> {

    public set(key: K, value: V): this {
        super.set(key, Utils.decoupleValue(value));
        return this;
    }

    public get(key: K): V | undefined {
        const value = super.get(key);
        return Utils.decoupleValue(value);
    }

    public entries(): IterableIterator<[K, V]> {
        // TODO: decouple values
        return super.entries();
    }

    public values(): IterableIterator<V> {
        // TODO: decouple values
        return super.values();
    }

    public snapshot(): Array<[K, V]> {
        // TODO: implement
        return [];
    }
}
