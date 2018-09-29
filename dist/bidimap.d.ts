export interface ReadonlyBidiMap<K, V> extends ReadonlyMap<K, V> {
    inverse(): ReadonlyMap<V, K>;
    dedupe(): BidiMap<K, V>;
}
export declare class BidiMap<K, V> implements ReadonlyBidiMap<K, V>, Map<K, V> {
    private xToY;
    private yToX;
    constructor(entries?: Iterable<[K, V]> | null);
    inverse(): BidiMap<V, K>;
    dedupe(): BidiMap<K, V>;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
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
