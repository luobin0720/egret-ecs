var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Debug = (function () {
    function Debug() {
    }
    Debug.log = function (type, format) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        switch (type) {
            case LogType.Error:
                console.error(type + ": " + format, args);
                break;
            case LogType.Warn:
                console.warn(type + ": " + format, args);
                break;
            case LogType.Log:
                console.log(type + ": " + format, args);
                break;
            case LogType.Info:
                console.info(type + ": " + format, args);
                break;
            case LogType.Trace:
                console.trace(type + ": " + format, args);
                break;
            default:
                throw new Error();
        }
    };
    Debug.warnIf = function (condition, format) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (condition)
            this.log(LogType.Warn, format, args);
    };
    return Debug;
}());
__reflect(Debug.prototype, "Debug");
var LogType;
(function (LogType) {
    LogType[LogType["Error"] = 0] = "Error";
    LogType[LogType["Warn"] = 1] = "Warn";
    LogType[LogType["Log"] = 2] = "Log";
    LogType[LogType["Info"] = 3] = "Info";
    LogType[LogType["Trace"] = 4] = "Trace";
})(LogType || (LogType = {}));
//# sourceMappingURL=Debug.js.map