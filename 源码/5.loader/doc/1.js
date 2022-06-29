const less = require('less');
let lessContent = `@color:red;`;
let result;
less.render(lessContent, { filename:'index.less'}, (err, output) => {
    //console.log(output);
    result = output;
});
console.log(result);