"use strict";
exports.__esModule = true;
var mPromise = /** @class */ (function () {
    function mPromise(executor) {
        var _this = this;
        this.status = "PENDING" /* PENDING */;
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        this.resolve = function (value) {
            if (_this.status !== "PENDING" /* PENDING */)
                return;
            _this.value = value;
            _this.status = "FULFILLED" /* FULFILLED */;
            _this.onFulfilledCallbacks.forEach(function (fn) { return fn(); });
        };
        this.reject = function (reason) {
            if (_this.status !== "PENDING" /* PENDING */)
                return;
            _this.reason = reason;
            _this.status = "REJECTED" /* REJECTED */;
            _this.onRejectedCallbacks.forEach(function (fn) { return fn(); });
        };
        this.resolvePromise = function (promise2, x, resolve, reject) {
            if (promise2 === x) {
                return reject(new TypeError('stack overflow'));
            }
            if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
                var called_1 = false;
                try {
                    var then = x.then;
                    if (typeof then === 'function') {
                        then.call(x, function (value) {
                            if (called_1)
                                return;
                            called_1 = true;
                            _this.resolvePromise(x, value, resolve, reject);
                        }, function (reason) {
                            if (called_1)
                                return;
                            called_1 = true;
                            reject(reason);
                        });
                    }
                    else {
                        if (called_1)
                            return;
                        called_1 = true;
                        resolve(x);
                    }
                }
                catch (error) {
                    if (called_1)
                        return;
                    called_1 = true;
                    reject(error);
                }
            }
            else {
                resolve(x);
            }
        };
        try {
            executor(this.resolve, this.reject);
        }
        catch (error) {
            this.resolve(error);
        }
    }
    mPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value; };
        onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
            throw reason;
        };
        var promise2 = new mPromise(function (resolve, reject) {
            var _a;
            var onFulfilledCallback = function () {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            };
            var onRejectedCallback = function () {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            };
            var callbacks = (_a = {},
                _a["FULFILLED" /* FULFILLED */] = onFulfilledCallback,
                _a["REJECTED" /* REJECTED */] = onRejectedCallback,
                _a["PENDING" /* PENDING */] = function () {
                    _this.onFulfilledCallbacks.push(onFulfilledCallback);
                    _this.onRejectedCallbacks.push(onRejectedCallback);
                },
                _a);
            callbacks[_this.status]();
        });
        return promise2;
    };
    return mPromise;
}());
exports["default"] = mPromise;
