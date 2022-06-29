var d = 4;
function one() {
  var a = 1;
  function two() {
    var b = 2;
    function three() {
      var c = 3;
      console.log(a, b, c, d);
    }
    //在这的作用域是谁?twoScope
    console.log(a, b, d);
  }
  console.log(a, b, d);
}
let Scope = require('./scope');
let globalScope = new Scope({ name: 'global', names: ['d'], parent: null });
let oneScope = new Scope({ name: 'one', names: ['a'], parent: globalScope });
let twoScope = new Scope({ name: 'two', names: ['b'], parent: oneScope });
let threeScope = new Scope({ name: 'three', names: ['c'], parent: twoScope });

console.log(
  threeScope.findDefiningScope('a').name,
  threeScope.findDefiningScope('b').name,
  threeScope.findDefiningScope('c').name,
  threeScope.findDefiningScope('d').name);