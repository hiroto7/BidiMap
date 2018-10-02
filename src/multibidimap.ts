import { ReadonlyBidiMap, BidiMap, DualBidiMap } from './bidimap';

export interface ReadonlyMultiBidiMap<K, V> extends ReadonlyBidiMap<K, V> {
  hasAny(key: K): boolean;
  has(key: K, value?: V): boolean;
  getAll(key: K): IterableIterator<V>;
  readonly inverse: ReadonlyMultiBidiMap<V, K>;
  dedupe(): ReadonlyMultiBidiMap<K, V>;
  forEach(callbackfn: (value: V, key: K, map: ReadonlyMultiBidiMap<K, V>) => void, thisArg?: any): void;
}

export interface MultiBidiMap<K, V> extends ReadonlyMultiBidiMap<K, V>, BidiMap<K, V> {
  delete(key: K, value?: V): boolean;
  has(key: K, value?: V): boolean;
  readonly inverse: MultiBidiMap<V, K>;
  dedupe(): MultiBidiMap<K, V>;
  forEach(callbackfn: (value: V, key: K, map: MultiBidiMap<K, V>) => void, thisArg?: any): void;
}

export class DualMultiBidiMap<K, V> implements MultiBidiMap<K, V> {
  private static readonly inverseFlag = Symbol('inverse');
  private static readonly privateFlag = Symbol('private');
  private readonly bidimap: BidiMap<K, V>;
  private readonly xToYs: Map<K, Set<V>>;
  private readonly yToXs: Map<V, Set<K>>;
  readonly inverse: MultiBidiMap<V, K>;

  constructor(entries?: Iterable<[K, V]> | null);
  constructor(bidimap: BidiMap<K, V>, xToYs: Map<K, Set<V>>, yToXs: Map<V, Set<K>>, privateFlag: symbol);
  constructor(inverse: DualMultiBidiMap<V, K>, inverseFlag: symbol);
  constructor(entries?: Iterable<[K, V]> | null, ...args: any[]) {
    if (entries instanceof DualMultiBidiMap && args[0] === DualMultiBidiMap.inverseFlag) {
      const inverse: DualMultiBidiMap<V, K> = entries;
      this.bidimap = inverse.bidimap.inverse;
      this.xToYs = inverse.yToXs;
      this.yToXs = inverse.xToYs;
      this.inverse = inverse;

    } else {
      if (entries instanceof DualBidiMap &&
        args[0] instanceof Map && args[1] instanceof Map &&
        args[2] === DualMultiBidiMap.privateFlag) {
        const bidimap: BidiMap<K, V> = entries;
        const xToYs: Map<K, Set<V>> = args[0];
        const yToXs: Map<V, Set<K>> = args[1];
        this.bidimap = bidimap;
        this.xToYs = xToYs;
        this.yToXs = yToXs;

      } else {
        this.bidimap = new DualBidiMap();
        this.xToYs = new Map<K, Set<V>>();
        this.yToXs = new Map<V, Set<K>>();
        if (entries !== null && entries !== undefined) {
          for (const [key, value] of entries) {
            this.set(key, value);
          }
        }
      }

      this.inverse = new DualMultiBidiMap<V, K>(this, DualMultiBidiMap.inverseFlag);
    }
  }

  private static deleteAMAP<K, V>(map: Map<K, Set<V>>, key: K, value: V, values0?: Set<V>) {
    if (map.has(key)) {
      const values: Set<V> = values0 || map.get(key)!;
      values.delete(value);
      if (values.size === 0) {
        map.delete(key);
      }
    }
  }

  delete(key: K, value?: V): boolean;
  delete(...args: [K, V?]): boolean {
    const key: K = args[0];

    switch (args.length) {
      case 1:
        if (this.xToYs.has(key)) {
          const values: Set<V> = this.xToYs.get(key)!;
          for (const value of values) {
            if (values.has(value) && this.yToXs.has(value)) {
              DualMultiBidiMap.deleteAMAP(this.xToYs, key, value, values);
              DualMultiBidiMap.deleteAMAP(this.yToXs, value, key);
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
            DualMultiBidiMap.deleteAMAP(this.xToYs, key, value, values);
            DualMultiBidiMap.deleteAMAP(this.yToXs, value, key);
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

  dedupe(): MultiBidiMap<K, V> {
    const bidimap: BidiMap<K, V> = this.bidimap.dedupe();
    return new DualMultiBidiMap(bidimap, this.xToYs, this.yToXs, DualMultiBidiMap.privateFlag);
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

  private static addSafely<K, V>(map: Map<K, Set<V>>, key: K, value: V) {
    if (map.has(key)) {
      const values: Set<V> = map.get(key)!;
      values.add(value);
    } else {
      map.set(key, new Set([value]));
    }
  }

  set(key: K, value: V): this {
    this.bidimap.set(key, value);
    DualMultiBidiMap.addSafely(this.xToYs, key, value);
    DualMultiBidiMap.addSafely(this.yToXs, value, key);

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
