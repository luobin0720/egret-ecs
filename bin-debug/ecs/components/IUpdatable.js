var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用于排序IUpdatables的比较器
 *
 * @class IUpdatableComparer
 */
var IUpdatableComparer = (function () {
    function IUpdatableComparer() {
    }
    IUpdatableComparer.prototype.Compare = function (a, b) {
        if (a.updateOrder == b.updateOrder) {
            return 0;
        }
        else if (a.updateOrder > b.updateOrder) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return IUpdatableComparer;
}());
__reflect(IUpdatableComparer.prototype, "IUpdatableComparer");
//# sourceMappingURL=IUpdatable.js.map