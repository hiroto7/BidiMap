export interface ReadonlyBidiMap<K, V> extends ReadonlyMap<K, V> {
    readonly inverse: ReadonlyBidiMap<V, K>;
    dedupe(): ReadonlyBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: ReadonlyBidiMap<K, V>) => void, thisArg?: any): void;
}
export interface BidiMap<K, V> extends ReadonlyBidiMap<K, V>, Map<K, V> {
    readonly inverse: BidiMap<V, K>;
    dedupe(): BidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void;
}
export declare class DualBidiMap<K, V> implements BidiMap<K, V> {
    private static readonly inverseFlag;
    private readonly xToY;
    private readonly yToX;
    readonly inverse: BidiMap<V, K>;
    constructor(entries?: Iterable<[K, V]> | null);
    constructor(inverse: DualBidiMap<V, K>, inverseFlag: symbol);
    dedupe(): BidiMap<K, V>;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    readonly size: number;
    readonly [Symbol.toStringTag]: 'Map';
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    toJSON(): any;
}
