export interface ReadonlyBidiMap<K, V> extends ReadonlyMap<K, V> {
  inverse(): ReadonlyMap<V, K>;
  dedupe(): BidiMap<K, V>;
}

export class BidiMap<K, V> implements ReadonlyBidiMap<K, V>, Map<K, V> {
  private xToY: Map<K, V>;
  private yToX: Map<V, K>;

  constructor(entries?: Iterable<[K, V]> | null) {
    this.xToY = new Map<K, V>();
    this.yToX = new Map<V, K>();
    if (entries !== null && entries !== undefined) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  inverse(): BidiMap<V, K> {
    return new BidiMap<V, K>(this.yToX);
  }

  dedupe(): BidiMap<K, V> {
    return this.inverse().inverse();
  }

  clear(): void {
    this.xToY.clear();
    this.yToX.clear();
  }

  delete(key: K): boolean {
    const value = this.xToY.get(key);
    if (this.yToX.get(value!) === key) this.yToX.delete(value!);
    return this.xToY.delete(key);
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
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
  };

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
