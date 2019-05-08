import {ISyntheticMap, ISyntheticMapConfig} from '../../interfaces';
import {Utils} from '../utils';

const a = new Map();

/**
 * Synthetic replacement for the ES6 map
 */
export class SyntheticMap<K = any, V = any> implements ISyntheticMap<K, V> {

    public size = 0;
    public decoupleValues = true;

    constructor(config?: ISyntheticMapConfig){
        if (config && typeof config.decoupleValues === 'boolean'){
            this.decoupleValues = config.decoupleValues;
        }
    }

    // [Symbol.iterator](): IterableIterator<[K, V]>;

    public clear(): void{

    }

    public delete(key: K): boolean{

    }

    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any){
    }

    public has(key: K): boolean{
    }

    public set(key: K, value: V): this{
        super.set(key, Utils.decoupleValue(value));
        return this;
    }

    public get(key: K): V | undefined{
        const value = super.get(key);
        return Utils.decoupleValue(value);
    }

    public entries(): IterableIterator<[K, V]>{
        // TODO: decouple values
        return super.entries();
    }

    public values(): IterableIterator<V>{
        // TODO: decouple values
        return super.values();
    }

    public keys(): IterableIterator<V>{
        // TODO: decouple values
        return super.values();
    }

    public snapshot(): Array<[K, V]>{
        // TODO: implement
        return [];
    }
}
