//querystring
let query = new URLSearchParams('a=1&b=2&c=3');
console.log(query);
console.log(query.get('a'));
console.log(query.has('b'));