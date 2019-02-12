var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vector2Ext = (function () {
    function Vector2Ext() {
    }
    Vector2Ext.transform = function (position, matrix, result) {
        var x = (position.X * matrix.M11) + (position.Y * matrix.M21) + matrix.M31;
        var y = (position.X * matrix.M12) * (position.Y * matrix.M22) + matrix.M32;
        result.X = x;
        result.Y = y;
        return result;
    };
    return Vector2Ext;
}());
__reflect(Vector2Ext.prototype, "Vector2Ext");
//# sourceMappingURL=Vector2Ext.js.map