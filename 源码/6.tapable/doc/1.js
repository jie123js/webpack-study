

function one() {
    setTimeout(() => {
        console.log('one');
    }, 1000);
}
function two() {
    setTimeout(() => {
        console.log('two');
    }, 2000);
}
function three() {
    setTimeout(() => {
        console.log('three');
    }, 3000);
}
one();
two();
three();