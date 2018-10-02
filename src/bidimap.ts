export interface ReadonlyBidiMap<K, V> extends ReadonlyMap<K, V> {
  readonly inverse: ReadonlyBidiMap<V, K>;
  dedupe(): ReadonlyBidiMap<K, V>;
  forEach(callbackfn: (value: V, key: K, map: ReadonlyBidiMap<K, V>) => void, thisArg?: any): void;
}
export namespace ReadonlyBidiMap {
  export function isReadonlyBidiMap<K, V>(iterable: Iterable<[K, V]> | any): iterable is ReadonlyBidiMap<K, V> {
    return iterable instanceof AbstractBidiMap;
  }
}

export interface BidiMap<K, V> extends ReadonlyBidiMap<K, V>, Map<K, V> {
  readonly inverse: BidiMap<V, K>;
  dedupe(): BidiMap<K, V>;
  forEach(callbackfn: (value: V, key: K, map: BidiMap<K, V>) => void, thisArg?: any): void;
}
export namespace BidiMap {
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

export class DualBidiMap<K, V> extends AbstractBidiMap<K, V> {
  protected readonly xToY: Map<K, V>;
  protected readonly yToX: Map<V, K>;
  readonly inverse: BidiMap<V, K>;

  constructor(entries?: Iterable<[K, V]> | null);
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