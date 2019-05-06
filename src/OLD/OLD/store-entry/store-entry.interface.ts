/**
 * Single entry
 */
export interface IStoreEntry<T = any> {
    currentPosition: number;
    history: T[];
}
