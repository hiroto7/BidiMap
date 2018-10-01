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

export class DualBidiMap<K, V> implements BidiMap<K, V> {
  private static readonly inverseFlag = Symbol('inverse');
  private readonly xToY: Map<K, V>;
  private readonly yToX: Map<V, K>;
  readonly inverse: BidiMap<V, K>;

  constructor(entries?: Iterable<[K, V]> | null);
  constructor(inverse: DualBidiMap<V, K>, inverseFlag: symbol);
  constructor(entries?: Iterable<[K, V]> | null, inverseFlag?: symbol) {
    if (entries instanceof DualBidiMap && inverseFlag === DualBidiMap.inverseFlag) {
      const inverse: DualBidiMap<V, K> = entries;
      this.xToY = inverse.yToX;
      this.yToX = inverse.xToY;
      this.inverse = inverse;
    } else {
      this.xToY = new Map<K, V>();
      this.yToX = new Map<V, K>();
      if (entries !== null && entries !== undefined) {
        for (const [key, value] of entries) {
          this.set(key, value);
        }
      }
      this.inverse = new DualBidiMap<V, K>(this, DualBidiMap.inverseFlag);
    }
  }

  dedupe(): BidiMap<K, V> {
    const inverseLike: DualBidiMap<V, K> = new DualBidiMap<V, K>(this.yToX);
    return new DualBidiMap<K, V>(inverseLike.yToX);
  }

  clear(): void {
    this.xToY.clear();
    this.yToX.clear();
  }

  delete(key: K): boolean {
    if (this.xToY.has(key)) {
      const value: V = this.xToY.get(key)!;
      if (this.yToX.has(value) && this.yToX.get(value) === key) {
        this.yToX.delete(value!);
      }
    }
    return this.xToY.delete(key);
  }

  forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void {
    this.forEach(callbackfn, thisArg);
  }

  get(key: K): V | undefined {
    return this.xToY.get(key);
  }

  has(key: K): boolean {
    return this.xToY.has(key);
  }

  set(key: K, value: V): this {
    this.xToY.set(key, value);
    this.yToX.set(value, key);
    return this;
  }

  get size(): number {
    return this.xToY.size;
  }

  readonly [Symbol.toStringTag]: 'Map' = 'Map';

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
