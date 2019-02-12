var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Matrix2D = (function () {
    function Matrix2D(m11, m12, m21, m22, m31, m32) {
        this.M11 = m11;
        this.M12 = m12;
        this.M21 = m21;
        this.M22 = m22;
        this.M31 = m31;
        this.M32 = m32;
    }
    Matrix2D.identity = function () {
        return this._identity;
    };
    Matrix2D.createTranslation = function (xPosition, yPosition, result) {
        result.M11 = 1;
        result.M12 = 0;
        result.M21 = 0;
        result.M22 = 1;
        result.M31 = xPosition;
        result.M32 = yPosition;
        return result;
    };
    Matrix2D.createRotation = function (radians, result) {
        result = Matrix2D.identity();
        var val1 = Math.cos(radians);
        var val2 = Math.sin(radians);
        result.M11 = val1;
        result.M12 = val2;
        result.M21 = -val2;
        result.M22 = val1;
        return result;
    };
    Matrix2D.createScale = function (xScale, yScale, result) {
        result.M11 = xScale;
        result.M12 = 0;
        result.M21 = 0;
        result.M22 = yScale;
        result.M31 = 0;
        result.M32 = 0;
        return result;
    };
    Matrix2D.multiply = function (matrix1, matrix2, result) {
        var m11 = (matrix1.M11 * matrix2.M11) + (matrix1.M12 * matrix2.M21);
        var m12 = (matrix1.M11 * matrix2.M12) + (matrix1.M12 * matrix2.M22);
        var m21 = (matrix1.M21 * matrix2.M11) + (matrix1.M22 * matrix2.M21);
        var m22 = (matrix1.M21 * matrix2.M12) + (matrix1.M22 * matrix2.M22);
        var m31 = (matrix1.M31 * matrix2.M11) + (matrix1.M32 * matrix2.M21) + matrix2.M31;
        var m32 = (matrix1.M31 * matrix2.M12) + (matrix1.M32 * matrix2.M22) + matrix2.M32;
        result.M11 = m11;
        result.M12 = m12;
        result.M21 = m21;
        result.M22 = m22;
        result.M31 = m31;
        result.M32 = m32;
        return result;
    };
    Matrix2D.prototype.determinant = function () {
        return this.M11 * this.M22 - this.M12 * this.M21;
    };
    Matrix2D.invert = function (matrix, result) {
        var det = 1 / matrix.determinant();
        result.M11 = matrix.M22 * det;
        result.M12 = -matrix.M12 * det;
        result.M21 = -matrix.M21 * det;
        result.M22 = matrix.M11 * det;
        result.M31 = (matrix.M32 * matrix.M21 - matrix.M31 * matrix.M22) * det;
        result.M32 = -(matrix.M32 * matrix.M11 - matrix.M31 * matrix.M12) * det;
        return result;
    };
    Matrix2D._identity = new Matrix2D(1, 0, 0, 1, 0, 0);
    return Matrix2D;
}());
__reflect(Matrix2D.prototype, "Matrix2D");
//# sourceMappingURL=Matrix2D.js.map