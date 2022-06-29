(function anonymous(name, age) {
    var _x = this._x;

    return new Promise((function (_resolve, _reject) {
        var _counter = 3;
        var _done = (function () {
            _resolve();
        });

        var _fn0 = _x[0];
        var _promise0 = _fn0(name, age);
        _promise0.then((function () {
            if (--_counter === 0) _done();
        }));

    }));

})