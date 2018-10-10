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