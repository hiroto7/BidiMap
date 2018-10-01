import { ReadonlyBidiMap, BidiMap } from './bidimap';
export interface ReadonlyMultiBidiMap<K, V> extends ReadonlyBidiMap<K, V> {
    hasAny(key: K): boolean;
    has(key: K, value?: V): boolean;
    getAll(key: K): IterableIterator<V>;
    readonly inverse: ReadonlyMultiBidiMap<V, K>;
    dedupe(): ReadonlyMultiBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMultiBidiMap<K, V>) => void, thisArg?: any): void;
}
export interface MultiBidiMap<K, V> extends ReadonlyMultiBidiMap<K, V>, BidiMap<K, V> {
    delete(key: K, value?: V): boolean;
    has(key: K, value?: V): boolean;
    readonly inverse: MultiBidiMap<V, K>;
    dedupe(): MultiBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void;
}
export declare class DualMultiBidiMap<K, V> implements MultiBidiMap<K, V> {
    private static readonly inverseFlag;
    private static readonly privateFlag;
    private readonly bidimap;
    private readonly xToYs;
    private readonly yToXs;
    readonly inverse: MultiBidiMap<V, K>;
    constructor(entries?: Iterable<[K, V]> | null);
    constructor(bidimap: BidiMap<K, V>, xToYs: Map<K, Set<V>>, yToXs: Map<V, Set<K>>, privateFlag: symbol);
    constructor(inverse: DualMultiBidiMap<V, K>, inverseFlag: symbol);
    delete(key: K, value?: V): boolean;
    hasAny(key: K): boolean;
    has(key: K, value?: V): boolean;
    getAll(key: K): IterableIterator<V>;
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
