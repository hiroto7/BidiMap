import { ReadonlyBidiMap, BidiMap } from './bidimap';
export interface ReadonlyMultiBidiMap<K, V> extends ReadonlyBidiMap<K, V> {
    hasAny(key: K): boolean;
    has(key: K, value?: V): boolean;
    getAll(key: K): IterableIterator<V>;
    inverse(): ReadonlyMultiBidiMap<V, K>;
    dedupe(): ReadonlyMultiBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMultiBidiMap<K, V>) => void, thisArg?: any): void;
}
export interface MultiBidiMap<K, V> extends ReadonlyMultiBidiMap<K, V>, BidiMap<K, V> {
    delete(key: K, value?: V): boolean;
    has(key: K, value?: V): boolean;
    inverse(): MultiBidiMap<V, K>;
    dedupe(): MultiBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void;
}
export declare class DualMultiBidiMap<K, V> implements MultiBidiMap<K, V> {
    private bidimap;
    private xToYs;
    private yToXs;
    constructor(entries?: Iterable<[K, V]> | null);
    delete(key: K, value?: V): boolean;
    hasAny(key: K): boolean;
    has(key: K, value?: V): boolean;
    getAll(key: K): IterableIterator<V>;
    inverse(): MultiBidiMap<V, K>;
    dedupe(): MultiBidiMap<K, V>;
    clear(): void;
    forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    readonly size: number;
    readonly [Symbol.toStringTag]: 'Map';
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    toJSON(): any;
}
