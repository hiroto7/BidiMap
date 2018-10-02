export interface ReadonlyBidiMap<K, V> extends ReadonlyMap<K, V> {
    readonly inverse: ReadonlyBidiMap<V, K>;
    dedupe(): ReadonlyBidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: ReadonlyBidiMap<K, V>) => void, thisArg?: any): void;
}
export declare namespace ReadonlyBidiMap {
    function isReadonlyBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is ReadonlyBidiMap<K, V>;
}
export interface BidiMap<K, V> extends ReadonlyBidiMap<K, V>, Map<K, V> {
    readonly inverse: BidiMap<V, K>;
    dedupe(): BidiMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void;
}
export declare namespace BidiMap {
    function isBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is BidiMap<K, V>;
}
declare abstract class AbstractBidiMap<K, V> implements BidiMap<K, V> {
    protected abstract readonly xToY: Map<K, V>;
    protected abstract readonly yToX: Map<V, K>;
    abstract readonly inverse: BidiMap<V, K>;
    readonly [Symbol.toStringTag]: 'Map';
    readonly size: number;
    dedupe(): BidiMap<K, V>;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    toJSON(): any;
}
export declare class DualBidiMap<K, V> extends AbstractBidiMap<K, V> {
    protected readonly xToY: Map<K, V>;
    protected readonly yToX: Map<V, K>;
    readonly inverse: BidiMap<V, K>;
    constructor(entries?: Iterable<[K, V]> | null);
    constructor(bidimap: ReadonlyBidiMap<K, V>);
}
export {};
