import { ReadonlyBidiMap, BidiMap } from './bidimap';
export interface ReadonlyMultiBidiMap<K, V> extends ReadonlyBidiMap<K, V> {
    hasAny(key: K): boolean;
    has(key: K, value?: V): boolean;
    getAll(key: K): IterableIterator<V>;
    entriesAll(): IterableIterator<[K, IterableIterator<V>]>;
    readonly inverse: ReadonlyMultiBidiMap<V, K>;
    dedupe(): ReadonlyMultiBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMultiBidiMap<K, V>) => void, thisArg?: any): void;
}
export declare namespace ReadonlyMultiBidiMap {
    function isReadonlyMultiBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is ReadonlyMultiBidiMap<K, V>;
}
export interface MultiBidiMap<K, V> extends ReadonlyMultiBidiMap<K, V>, BidiMap<K, V> {
    delete(key: K, value?: V): boolean;
    has(key: K, value?: V): boolean;
    readonly inverse: MultiBidiMap<V, K>;
    dedupe(): MultiBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void;
}
export declare namespace MultiBidiMap {
    function isMultiBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is MultiBidiMap<K, V>;
}
declare abstract class AbstractMultiBidiMap<K, V> implements MultiBidiMap<K, V> {
    protected static readonly protectedFlag: unique symbol;
    protected abstract readonly bidimap: BidiMap<K, V>;
    protected abstract readonly xToYs: Map<K, Set<V>>;
    protected abstract readonly yToXs: Map<V, Set<K>>;
    abstract readonly inverse: MultiBidiMap<V, K>;
    readonly [Symbol.toStringTag]: 'Map';
    readonly size: number;
    private static deleteAMAP;
    delete(key: K, value?: V): boolean;
    hasAny(key: K): boolean;
    has(key: K, value?: V): boolean;
    getAll(key: K): IterableIterator<V>;
    entriesAll(): IterableIterator<[K, IterableIterator<V>]>;
    dedupe(): MultiBidiMap<K, V>;
    clear(): void;
    forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    private static addSafely;
    set(key: K, value: V): this;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    toJSON(): any;
}
export declare class DualMultiBidiMap<K, V> extends AbstractMultiBidiMap<K, V> {
    protected readonly bidimap: BidiMap<K, V>;
    protected readonly xToYs: Map<K, Set<V>>;
    protected readonly yToXs: Map<V, Set<K>>;
    readonly inverse: MultiBidiMap<V, K>;
    constructor(entries?: Iterable<[K, V]> | null);
    constructor(multibidimap: ReadonlyMultiBidiMap<K, V>);
    constructor(bidimap: BidiMap<K, V>, xToYs: Map<K, Set<V>>, yToXs: Map<V, Set<K>>, protectedFlag: symbol);
}
export {};
