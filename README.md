# BidiMap

TypeScript/JavaScriptで動作する双方向マップ

## 例

### `BidiMap`の例
``` TypeScript
import {
  ReadonlyBidiMap, BidiMap, DualBidiMap,
  ReadonlyMultiBidiMap, MultiBidiMap, DualMultiBidiMap
} from 'bidimap';

const map: Map<string, number> = new Map<string, number>();

map.set('a', 0);
map.set('b', 1);

const bidimap0: BidiMap<string, number> = new DualBidiMap<string, number>(map);
const bidimap1: BidiMap<number, string> = bidimap0.inverse;

console.log(bidimap0.get('a')); // 0
console.log(bidimap1.get(1)); // 'b'

bidimap0.set('c', 2);
bidimap0.set('d', 3);
bidimap1.set(4, 'e');
bidimap1.set(5, 'f');

console.log(bidimap0.get('c')); // 2
console.log(bidimap1.get(3)); // 'd'
console.log(bidimap0.get('e')); // 4
console.log(bidimap1.get(5)); // 'f'

bidimap0.set('c', 6);
console.log(bidimap0.get('c')); // 6
console.log(bidimap1.get(2)); // 'c'
console.log(bidimap1.get(6)); // 'c'

const bidimap2: BidiMap<string, number> = bidimap0.dedupe();
const bidimap3: BidiMap<number, string> = bidimap2.inverse;

console.log(bidimap2.get('c')); // 6
console.log(bidimap3.get(2)); // undefined
console.log(bidimap3.get(6)); // 'c'
```

### `MultiBidiMap`の例

``` TypeScript
const multimap0: MultiBidiMap<string, number> = new DualMultiBidiMap<string, number>(map);
const multimap1: MultiBidiMap<number, string> = multimap0.inverse;

multimap0.set('a', 10);
multimap0.set('a', 11);
multimap0.set('b', 11);

console.log(multimap0.get('a')); // 11
console.log(multimap0.get('b')); // 11
console.log([...multimap0.getAll('a')]); // [0, 10, 11]
console.log([...multimap0.getAll('b')]); // [1, 11]

console.log([...multimap1.getAll(10)]); // ['a']
console.log([...multimap1.getAll(11)]); // ['a', 'b']
```

## `Map`, `BidiMap`, `MultiBidiMap`の関係

`BidiMap`は`Map`を拡張したインターフェースです。
このため，`BidiMap`は`Map`に互換性があります。

同様に`MultiBidiMap`は`BidiMap`を拡張したインターフェースであり，
`BidiMap`および`Map`に互換性があります。

``` TypeScript
export interface ReadonlyBidiMap<K, V> extends ReadonlyMap<K, V> { ... }
export interface BidiMap<K, V> extends ReadonlyBidiMap<K, V>, Map<K, V> { ... }
export interface ReadonlyMultiBidiMap<K, V> extends ReadonlyBidiMap<K, V> { ... }
export interface MultiBidiMap<K, V> extends ReadonlyMultiBidiMap<K, V>, BidiMap<K, V> { ... }
```

## 読み取り専用の`ReadonlyBidiMap`, `ReadonlyMultiBidiMap`

`set()`などの変更を行うメソッドを省いた読み取り専用の型として，
`BidiMap`に対応する`ReadonlyBidiMap`，および
`MultiBidiMap`に対応する`ReadonlyMultiBidiMap`があります。

``` TypeScript
const map9: ReadonlyMap<string, number> = new Map<string, number>();
const bidimap9: ReadonlyBidiMap<string, number> = new DualBidiMap<string, number>();
const multimap9: ReadonlyMultiBidiMap<string, number> = new DualMultiBidiMap<string, number>();

map9.set(9, 'z'); // error
bidimap9.set(9, 'z'); // error
multimap9.set(9, 'z'); // error
```
