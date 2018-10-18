/**
 * `BidiMap`を読み取り専用にする型です。
 * `ReadonlyBidiMap`は変更を与えるメソッドを持ちません。
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
export namespace ReadonlyBidiMap {
  /**
   * オブジェクトが`ReadonlyBidiMap`または`BidiMap`であるかどうかを判定します。
   * @param K マップのキーの型
   * @param V マップの値の型
   * @param iterable 判定するオブジェクト
   * @returns オブジェクトが`ReadonlyBidiMap`または`BidiMap`であれば`true`、そうでなければ`false`
   */
  export function isReadonlyBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is ReadonlyBidiMap<K, V> {
    return iterable instanceof AbstractBidiMap;
  }
}

/**
 * キーから値、および値からキーへのマッピングを保持するマップです。
 * `Map`ではキーから値を検索できますが、
 * `BidiMap`では値からキーを検索することもできます。
 * `inverse`プロパティにより逆方向のマップ（逆写像）にアクセスできます。
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
export namespace BidiMap {
  /**
   * オブジェクトが`BidiMap`であるかどうかを判定します。
   * @param K マップのキーの型
   * @param V マップの値の型
   * @param iterable 判定するオブジェクト
   * @returns オブジェクトが`BidiMap`であれば`true`
   */
  export function isBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is BidiMap<K, V> {
    return iterable instanceof AbstractBidiMap;
  }
}

abstract class AbstractBidiMap<K, V> implements BidiMap<K, V> {
  protected abstract readonly xToY: Map<K, V>;
  protected abstract readonly yToX: Map<V, K>;

  abstract readonly inverse: BidiMap<V, K>;
  readonly [Symbol.toStringTag]: 'Map' = 'Map';

  get size(): number {
    return this.xToY.size;
  }

  dedupe(): BidiMap<K, V> {
    const inverseLike: BidiMap<V, K> = new DualBidiMap<V, K>(this.inverse);
    return new DualBidiMap<K, V>(inverseLike.inverse);
  }

  /**
   * このマップおよび`this.inverse`からすべてのマッピングを削除します。
   */
  clear(): void {
    this.xToY.clear();
    this.yToX.clear();
  }

  /**
   * 指定されたキーのマッピングが存在する場合、これを削除します。
   * 逆方向のマッピングが`this.inverse`に存在すれば、これも削除します。
   * @param key 
   */
  delete(key: K): boolean {
    if (this.xToY.has(key)) {
      const value: V = this.xToY.get(key)!;
      if (this.yToX.has(value) && this.yToX.get(value) === key) {
        this.yToX.delete(value!);
      }
    }
    return this.xToY.delete(key);
  }

  /**
   * マップのすべてのキー・値に対して指定された関数を実行します。
   * @param callbackfn それぞれのキー・値に対して実行する関数
   * @param thisArg `callbackfn`を実行するとき、`this`として使うオブジェクト
   */
  forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void {
    this.forEach(callbackfn, thisArg);
  }

  /**
   * 指定されたキーがマッピングしている値を返します。
   * マッピングが存在しなければ`undefined`を返します。
   * @param key マッピングのキー
   * @returns マッピングの値、存在しなければ`undefined`
   */
  get(key: K): V | undefined {
    return this.xToY.get(key);
  }

  /**
   * 指定されたキーのマッピングが存在するかどうかを判定します。
   * @param key マッピングのキー
   * @returns マッピングが存在すれば`true`、存在しなければ`false`
   */
  has(key: K): boolean {
    return this.xToY.has(key);
  }

  /**
   * 指定されたキーから値への、新しいマッピングを追加します。
   * 同時に`this.inverse`には、値からキーへのマッピングが追加されます。
   * @param key マッピングのキー
   * @param value マッピングの値
   */
  set(key: K, value: V): this {
    this.xToY.set(key, value);
    this.yToX.set(value, key);
    return this;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.xToY[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, V]> {
    return this.xToY.entries();
  }

  keys(): IterableIterator<K> {
    return this.xToY.keys();
  }

  values(): IterableIterator<V> {
    return this.xToY.values();
  }

  toJSON(): any {
    return this.xToY.toJSON();
  }
}

/**
 * `BidiMap`の実装です。
 * @param K キーの型
 * @param V 値の型
 */
export class DualBidiMap<K, V> extends AbstractBidiMap<K, V> {
  protected readonly xToY: Map<K, V>;
  protected readonly yToX: Map<V, K>;
  readonly inverse: BidiMap<V, K>;

  /**
   * 新しい`DualBidiMap`を生成します。
   * 第1引数が省略されるか`null`が渡された場合、空の`DualBidiMap`が生成されます。
   * 第1引数に`Iterable<[K, V]>`（要素を「キーと値のタプル」とする配列、または`Iterable`オブジェクト）が渡された場合、
   * すべてのキー・値のマッピングが新しい`DualBidiMap`に追加されます。
   * @param entries 要素を「キーと値のタプル」とする配列、または`Iterable`オブジェクト
   */
  constructor(entries?: Iterable<[K, V]> | null);
  /**
   * 第1引数に指定された`ReadonlyBidiMap`または`BidiMap`オブジェクトのコピーとなる、
   * 新しい`DualBidiMap`を生成します。
   * @param bidimap コピーされる`ReadonlyBidiMap`または`BidiMap`オブジェクト
   */
  constructor(bidimap: ReadonlyBidiMap<K, V>);
  constructor(entries?: Iterable<[K, V]> | ReadonlyBidiMap<K, V> | null) {
    super();
    if (ReadonlyBidiMap.isReadonlyBidiMap<K, V>(entries)) {
      const bidimap: ReadonlyBidiMap<K, V> = entries;
      this.xToY = new Map<K, V>(bidimap);
      this.yToX = new Map<V, K>(bidimap.inverse);
    } else {
      this.xToY = new Map<K, V>();
      this.yToX = new Map<V, K>();
      if (entries !== null && entries !== undefined) {
        for (const [key, value] of entries) {
          this.set(key, value);
        }
      }
    }
    this.inverse = new InverseBidiMap<V, K>(this, this.yToX, this.xToY);
  }
}

class InverseBidiMap<K, V> extends AbstractBidiMap<K, V> {
  constructor(
    readonly inverse: BidiMap<V, K>,
    protected readonly xToY: Map<K, V>,
    protected readonly yToX: Map<V, K>
  ) {
    super();
  }
}