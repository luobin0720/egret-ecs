class Matrix2D{
    public M11: number;
    public M12: number;
    public M21: number;
    public M22: number;
    public M31: number;
    public M32: number;

    constructor(m11: number, m12: number, m21: number, m22: number, m31: number, m32: number){
        this.M11 = m11;
        this.M12 = m12;
        this.M21 = m21;
        this.M22 = m22;
        this.M31 = m31;
        this.M32 = m32;
    }

    private static _identity: Matrix2D = new Matrix2D(1, 0, 0, 1, 0, 0);
    public static identity(): Matrix2D{
        return this._identity;
    }

    public static createTranslation(xPosition: number, yPosition: number, result: Matrix2D): Matrix2D{
        result.M11 = 1;
        result.M12 = 0;

        result.M21 = 0;
        result.M22 = 1;

        result.M31 = xPosition;
        result.M32 = yPosition;

        return result;
    }

    public static createRotation(radians: number, result: Matrix2D): Matrix2D{
        result = Matrix2D.identity();

        let val1 = Math.cos(radians);
        let val2 = Math.sin(radians);

        result.M11 = val1;
        result.M12 = val2;
        result.M21 = -val2;
        result.M22 = val1;

        return result;
    }

    public static createScale(xScale: number, yScale: number, result: Matrix2D): Matrix2D{
        result.M11 = xScale;
        result.M12 = 0;

        result.M21 = 0;
        result.M22 = yScale;

        result.M31 = 0;
        result.M32 = 0;

        return result;
    }

    public static multiply(matrix1: Matrix2D, matrix2: Matrix2D, result: Matrix2D): Matrix2D{
        let m11 = (matrix1.M11 * matrix2.M11) + (matrix1.M12 * matrix2.M21);
        let m12 = (matrix1.M11 * matrix2.M12) + (matrix1.M12 * matrix2.M22);

        let m21 = (matrix1.M21 * matrix2.M11) + (matrix1.M22 * matrix2.M21);
        let m22 = (matrix1.M21 * matrix2.M12) + (matrix1.M22 * matrix2.M22);

        let m31 = (matrix1.M31 * matrix2.M11) + (matrix1.M32 * matrix2.M21) + matrix2.M31;
        let m32 = (matrix1.M31 * matrix2.M12) + (matrix1.M32 * matrix2.M22) + matrix2.M32;

        result.M11 = m11;
        result.M12 = m12;

        result.M21 = m21;
        result.M22 = m22;

        result.M31 = m31;
        result.M32 = m32;

        return result;
    }

    public determinant(): number{
        return this.M11 * this.M22 - this.M12 * this.M21;
    }

    public static invert(matrix: Matrix2D, result: Matrix2D): Matrix2D{
        let det = 1 / matrix.determinant();

        result.M11 = matrix.M22 * det;
        result.M12 = -matrix.M12 * det;

        result.M21 = -matrix.M21 * det;
        result.M22 = matrix.M11 * det;

        result.M31 = (matrix.M32 * matrix.M21 - matrix.M31 * matrix.M22) * det;
        result.M32 = -(matrix.M32 * matrix.M11 - matrix.M31 * matrix.M12) * det;

        return result;
    }
}