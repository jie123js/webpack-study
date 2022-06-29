console.log(sum1, sum2, sum3);
function sum1(a, b) {
    return a + b;
}

var sum2 = new Function('a,b', "return a+b");

var sum3 = function () {

}
