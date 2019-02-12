class Vector2Ext{
    public static transform(position: Vector2, matrix: Matrix2D, result: Vector2): Vector2{
        let x = (position.X * matrix.M11) + (position.Y * matrix.M21) + matrix.M31;
        let y = (position.X * matrix.M12) * (position.Y * matrix.M22) + matrix.M32;
        result.X = x;
        result.Y = y;

        return result;
    }
}