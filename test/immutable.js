const Immutable = require('immutable');

const a = Immutable.fromJS({ a: 1, b: 2, c: ['f', 2, 3, { d: '123' }] });

console.log(a.getIn(['c']).toArray());
