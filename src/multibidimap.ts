import { ReadonlyBidiMap, BidiMap, DualBidiMap } from './bidimap';

export interface ReadonlyMultiBidiMap<K, V> extends ReadonlyBidiMap<K, V> {
  hasAny(key: K): boolean;
  has(key: K, value?: V): boolean;
  getAll(key: K): IterableIterator<V>;
  inverse(): ReadonlyMultiBidiMap<V, K>;
  dedupe(): ReadonlyMultiBidiMap<K, V>;
  forEach(callbackfn: (value: V, key: K, map: ReadonlyMultiBidiMap<K, V>) => void, thisArg?: any): void;
}

export interface MultiBidiMap<K, V> extends ReadonlyMultiBidiMap<K, V>, BidiMap<K, V> {
  delete(key: K, value?: V): boolean;
  has(key: K, value?: V): boolean;
  inverse(): MultiBidiMap<V, K>;
  dedupe(): MultiBidiMap<K, V>;
  forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void;
}

export class DualMultiBidiMap<K, V> implements MultiBidiMap<K, V> {
  private bidimap: BidiMap<K, V>;
  private xToYs: Map<K, Set<V>>;
  private yToXs: Map<V, Set<K>>;

  constructor(entries?: Iterable<[K, V]> | null) {
    this.bidimap = new DualBidiMap();
    this.xToYs = new Map();
    this.yToXs = new Map();
    if (entries !== null && entries !== undefined) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  delete(key: K, value?: V): boolean;
  delete(...args: [K, V?]): boolean {
    function deleteAMAP<K, V>(map: Map<K, Set<V>>, key: K, value: V, values0?: Set<V>) {
      if (map.has(key)) {
        const values: Set<V> = values0 || map.get(key)!;
        values.delete(value);
        if (values.size === 0) {
          map.delete(key);
        }
      }
    }

    const key: K = args[0];

    switch (args.length) {
      case 1:
        if (this.xToYs.has(key)) {
          const values: Set<V> = this.xToYs.get(key)!;
          for (const value of values) {
            if (values.has(value) && this.yToXs.has(value)) {
              deleteAMAP(this.xToYs, key, value, values);
              deleteAMAP(this.yToXs, value, key);
            }
          }
        }
        return this.bidimap.delete(key);

      case 2:
        const value: V = args[1]!;
        if (this.xToYs.has(key)) {
          if (this.bidimap.has(key) && this.bidimap.get(key) === value) {
            this.bidimap.delete(key);
          }
          const values: Set<V> = this.xToYs.get(key)!;
          if (values.has(value) && this.yToXs.has(value)) {
            deleteAMAP(this.xToYs, key, value, values);
            deleteAMAP(this.yToXs, value, key);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
    }
  }

  hasAny(key: K): boolean {
    return this.xToYs.has(key) &&
      this.xToYs.get(key)!.size > 0;
  }

  has(key: K, value?: V): boolean;
  has(...args: [K, V?]): boolean {
    const key: K = args[0];

    switch (args.length) {
      case 1:
        return this.bidimap.has(key);

      case 2:
        const value: V = args[1]!;
        if (this.xToYs.has(key)) {
          const values: Set<V> = this.xToYs.get(key)!;
          return values.has(value);
        } else {
          return false;
        }
    }
  }

  getAll(key: K): IterableIterator<V> {
    if (this.xToYs.has(key)) {
      const values: Set<V> = this.xToYs.get(key)!;
      return values[Symbol.iterator]();
    } else {
      const set = new Set<V>();
      return set[Symbol.iterator]();
    }
  }

  inverse(): MultiBidiMap<V, K> {
    const multibidimap = new DualMultiBidiMap<V, K>();
    multibidimap.bidimap = this.bidimap.inverse();
    multibidimap.xToYs = this.yToXs;
    multibidimap.yToXs = this.xToYs;
    return multibidimap;
  }

  dedupe(): MultiBidiMap<K, V> {
    const multibidimap = new DualMultiBidiMap<K, V>();
    multibidimap.bidimap = this.bidimap.inverse().inverse();
    multibidimap.xToYs = this.xToYs;
    multibidimap.yToXs = this.yToXs;
    return multibidimap;
  }

  clear(): void {
    this.bidimap.clear();
    this.xToYs.clear();
    this.yToXs.clear();
  }

  forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void {
    this.forEach(callbackfn, thisArg);
  }

  get(key: K): V | undefined {
    return this.bidimap.get(key);
  }

  set(key: K, value: V): this {
    function addSafely<K, V>(map: Map<K, Set<V>>, key: K, value: V) {
      if (map.has(key)) {
        const values: Set<V> = map.get(key)!;
        values.add(value);
      } else {
        map.set(key, new Set([value]));
      }
    }

    this.bidimap.set(key, value);
    addSafely(this.xToYs, key, value);
    addSafely(this.yToXs, value, key);

    return this;
  }

  get size(): number {
    return this.bidimap.size;
  };

  readonly [Symbol.toStringTag]: 'Map' = 'Map';

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.bidimap[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, V]> {
    return this.bidimap.entries();
  }

  keys(): IterableIterator<K> {
    return this.bidimap.keys();
  }

  values(): IterableIterator<V> {
    return this.bidimap.values();
  }

  toJSON(): any {
    return this.bidimap.toJSON();
  }
}
