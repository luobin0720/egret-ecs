var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Assert = (function () {
    function Assert() {
    }
    Assert.fail = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (message)
            console.assert(false, message, args);
        else
            console.assert(false);
    };
    Assert.isTrue = function (condition, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!condition) {
            if (message)
                Assert.fail(message, args);
            else
                Assert.fail();
        }
    };
    Assert.isNotNull = function (obj, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        Assert.isTrue(obj != null, message, args);
    };
    Assert.isFalse = function (condition, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (message)
            this.isTrue(!condition, message, args);
        else
            this.isTrue(!condition);
    };
    return Assert;
}());
__reflect(Assert.prototype, "Assert");
//# sourceMappingURL=Assert.js.map