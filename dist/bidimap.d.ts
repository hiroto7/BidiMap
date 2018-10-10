/**
 * @param K キーの型
 * @param V 値の型
 */
export interface ReadonlyBidiMap<K, V> extends ReadonlyMap<K, V> {
    /**
     * 逆方向のマップ、すなわち値からキーへのマップです。
     */
    readonly inverse: ReadonlyBidiMap<V, K>;
    /**
     * キー・値の両方から重複を取り除いたマップを返します。
     */
    dedupe(): ReadonlyBidiMap<K, V>;
    /**
     * マップのすべてのキー・値に対して指定された関数を実行します。
     * @param callbackfn それぞれのキー・値に対して実行する関数
     * @param thisArg `callbackfn`を実行するとき、`this`として使うオブジェクト
     */
    forEach(callbackfn: (value: V, key: K, map: ReadonlyBidiMap<K, V>) => void, thisArg?: any): void;
}
export declare namespace ReadonlyBidiMap {
    /**
     * オブジェクトが`ReadonlyBidiMap`または`BidiMap`であるかどうかを判定します。
     * @param K マップのキーの型
     * @param V マップの値の型
     * @param iterable 判定するオブジェクト
     * @returns オブジェクトが`ReadonlyBidiMap`または`BidiMap`であれば`true`、そうでなければ`false`
     */
    function isReadonlyBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is ReadonlyBidiMap<K, V>;
}
/**
 * @param K キーの型
 * @param V 値の型
 */
export interface BidiMap<K, V> extends ReadonlyBidiMap<K, V>, Map<K, V> {
    /**
     * 逆方向のマップ、すなわち値からキーへのマップです。
     */
    readonly inverse: BidiMap<V, K>;
    /**
     * キー・値の両方から重複を取り除いたマップを返します。
     */
    dedupe(): BidiMap<K, V>;
    /**
     * マップのすべてのキー・値に対して指定された関数を実行します。
     * @param callbackfn それぞれのキー・値に対して実行する関数
     * @param thisArg `callbackfn`を実行するとき、`this`として使うオブジェクト
     */
    forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void;
}
export declare namespace BidiMap {
    /**
     * オブジェクトが`BidiMap`であるかどうかを判定します。
     * @param K マップのキーの型
     * @param V マップの値の型
     * @param iterable 判定するオブジェクト
     * @returns オブジェクトが`BidiMap`であれば`true`
     */
    function isBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is BidiMap<K, V>;
}
declare abstract class AbstractBidiMap<K, V> implements BidiMap<K, V> {
    protected abstract readonly xToY: Map<K, V>;
    protected abstract readonly yToX: Map<V, K>;
    abstract readonly inverse: BidiMap<V, K>;
    readonly [Symbol.toStringTag]: 'Map';
    readonly size: number;
    dedupe(): BidiMap<K, V>;
    /**
     * このマップおよび`this.inverse`からすべてのマッピングを削除します。
     */
    clear(): void;
    /**
     * 指定されたキーのマッピングが存在する場合、これを削除します。
     * 逆方向のマッピングが`this.inverse`に存在すれば、これも削除します。
     * @param key
     */
    delete(key: K): boolean;
    /**
     * マップのすべてのキー・値に対して指定された関数を実行します。
     * @param callbackfn それぞれのキー・値に対して実行する関数
     * @param thisArg `callbackfn`を実行するとき、`this`として使うオブジェクト
     */
    forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void;
    /**
     * 指定されたキーがマッピングしている値を返します。
     * マッピングが存在しなければ`undefined`を返します。
     * @param key マッピングのキー
     * @returns マッピングの値、存在しなければ`undefined`
     */
    get(key: K): V | undefined;
    /**
     * 指定されたキーのマッピングが存在するかどうかを判定します。
     * @param key マッピングのキー
     * @returns マッピングが存在すれば`true`、存在しなければ`false`
     */
    has(key: K): boolean;
    /**
     * 指定されたキーから値への、新しいマッピングを追加します。
     * 同時に`this.inverse`には、値からキーへのマッピングが追加されます。
     * @param key マッピングのキー
     * @param value マッピングの値
     */
    set(key: K, value: V): this;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    toJSON(): any;
}
/**
 * @param K キーの型
 * @param V 値の型
 */
export declare class DualBidiMap<K, V> extends AbstractBidiMap<K, V> {
    protected readonly xToY: Map<K, V>;
    protected readonly yToX: Map<V, K>;
    readonly inverse: BidiMap<V, K>;
    constructor(entries?: Iterable<[K, V]> | null);
    constructor(bidimap: ReadonlyBidiMap<K, V>);
}
export {};
