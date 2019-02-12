class Vector2{
    private static readonly zeroVector: Vector2 = new Vector2(0, 0);
    private static readonly unitVector: Vector2 = new Vector2(1, 1);
    private static readonly unitXVector: Vector2 = new Vector2(1, 0);
    private static readonly unitYVector: Vector2 = new Vector2(0, 1);

    public X: number;
    public Y: number;

    public static Zero(): Vector2{
        return this.zeroVector;
    }

    public static One(): Vector2{
        return this.unitVector;
    }

    public static UnitX(): Vector2{
        return this.unitXVector;
    }

    public static UnitY(): Vector2{
        return this.unitYVector;
    }

    public DebugDisplayString(): string{
        return this.X.toString() + " " + this.Y.toString();
    }

    constructor(x: number, y: number){
        this.X = x;
        this.Y = y;
    }

    public static Add(value1: Vector2, value2: Vector2): Vector2{
        value1.X += value2.X;
        value1.Y += value2.Y;
        return value1;
    }

    public static Divide(value1: Vector2, value2:Vector2): Vector2
    {
        value1.X /= value2.X;
        value1.Y /= value2.Y;
        return value1;
    }

    public static Multipy(value1: Vector2, value2: Vector2): Vector2{
        value1.X *= value2.X;
        value1.Y *= value2.Y;
        return value1;
    }

    public static Distance(value1: Vector2, value2: Vector2): number{
        let v1: number = value1.X - value2.X;
        let v2: number = value1.Y - value2.Y;
        return <number>Math.sqrt((v1 * v1) + (v2 * v2));
    }

    public Equals(obj: object): boolean{
        if (obj instanceof Vector2){
            return (this.X == obj.X) && (this.Y == obj.Y);
        }

        return false;
    }

    public Length(): number{
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
    }

    public static Max(value1: Vector2, value2: Vector2): Vector2{
        return new Vector2(value1.X > value2.X ? value1.X : value2.X,
                            value1.Y > value2.Y ? value1.Y : value2.Y);
    }

    public static Min(value1: Vector2, value2: Vector2): Vector2{
        return new Vector2(value1.X < value2.X ? value1.X : value2.X,
                            value1.Y < value2.Y ? value1.Y : value2.Y);
    }

    public static Normalize(value: Vector2): Vector2{
        let val = 1 / Math.sqrt((value.X * value.X) + (value.Y * value.Y));
        value.X *= val;
        value.Y *= val;

        return value;
    }

    public static Transform(position: Vector2, matrix: Matrix2D): Vector2{
        return new Vector2((position.X * matrix.M11) + (position.Y * matrix.M21), (position.X * matrix.M12) + (position.Y * matrix.M22));
    }
}