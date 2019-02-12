var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Mathf = (function () {
    function Mathf() {
    }
    /**
     * 将某个值从某个任意范围映射到0到1范围
     */
    Mathf.map01 = function (value, min, max) {
        return (value - min) * 1 / (max - min);
    };
    Mathf.clamp01 = function (value) {
        if (value < 0)
            return 0;
        if (value > 1)
            return 1;
        return value;
    };
    return Mathf;
}());
__reflect(Mathf.prototype, "Mathf");
//# sourceMappingURL=Mathf.js.map