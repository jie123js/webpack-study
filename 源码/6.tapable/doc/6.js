(function anonymous(name, age, _callback) {

    //header
    var _x = this._x;

    var _counter = 3;
    var _done = (function () {
        _callback();
    });

    var _fn0 = _x[0];
    _fn0(name, age, (function () {
        if (--_counter === 0) _done();
    }));

    var _fn1 = _x[1];
    _fn1(name, age, (function () {
        if (--_counter === 0) _done();
    }));

    var _fn2 = _x[2];
    _fn2(name, age, (function () {
        if (--_counter === 0) _done();
    }));
})