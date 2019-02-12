var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vector2 = (function () {
    function Vector2(x, y) {
        this.X = x;
        this.Y = y;
    }
    Vector2.Zero = function () {
        return this.zeroVector;
    };
    Vector2.One = function () {
        return this.unitVector;
    };
    Vector2.UnitX = function () {
        return this.unitXVector;
    };
    Vector2.UnitY = function () {
        return this.unitYVector;
    };
    Vector2.prototype.DebugDisplayString = function () {
        return this.X.toString() + " " + this.Y.toString();
    };
    Vector2.Add = function (value1, value2) {
        value1.X += value2.X;
        value1.Y += value2.Y;
        return value1;
    };
    Vector2.Divide = function (value1, value2) {
        value1.X /= value2.X;
        value1.Y /= value2.Y;
        return value1;
    };
    Vector2.Multipy = function (value1, value2) {
        value1.X *= value2.X;
        value1.Y *= value2.Y;
        return value1;
    };
    Vector2.Distance = function (value1, value2) {
        var v1 = value1.X - value2.X;
        var v2 = value1.Y - value2.Y;
        return Math.sqrt((v1 * v1) + (v2 * v2));
    };
    Vector2.prototype.Equals = function (obj) {
        if (obj instanceof Vector2) {
            return (this.X == obj.X) && (this.Y == obj.Y);
        }
        return false;
    };
    Vector2.prototype.Length = function () {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
    };
    Vector2.Max = function (value1, value2) {
        return new Vector2(value1.X > value2.X ? value1.X : value2.X, value1.Y > value2.Y ? value1.Y : value2.Y);
    };
    Vector2.Min = function (value1, value2) {
        return new Vector2(value1.X < value2.X ? value1.X : value2.X, value1.Y < value2.Y ? value1.Y : value2.Y);
    };
    Vector2.Normalize = function (value) {
        var val = 1 / Math.sqrt((value.X * value.X) + (value.Y * value.Y));
        value.X *= val;
        value.Y *= val;
        return value;
    };
    Vector2.Transform = function (position, matrix) {
        return new Vector2((position.X * matrix.M11) + (position.Y * matrix.M21), (position.X * matrix.M12) + (position.Y * matrix.M22));
    };
    Vector2.zeroVector = new Vector2(0, 0);
    Vector2.unitVector = new Vector2(1, 1);
    Vector2.unitXVector = new Vector2(1, 0);
    Vector2.unitYVector = new Vector2(0, 1);
    return Vector2;
}());
__reflect(Vector2.prototype, "Vector2");
//# sourceMappingURL=Vector2.js.map