const Immutable = require('immutable');

// const a = Immutable.fromJS({ a: 1, b: 2, c: ['f', 2, 3, { d: '123' }] });

// console.log(a.getIn(['c']).toArray());

const a = Immutable.List.of('a', 'b', 'c');
const b = ['d', 'f', 'g'];
// console.log(a.merge(b).toJS());

console.log(a.includes('a'));
