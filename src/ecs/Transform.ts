class Transform{
    /**
     * 与此转换关联的实体
     *
     * @type {Entity}
     * @memberof Transform
     */
    public readonly entity: Entity;

    private _parent: Transform;
    private _localDirty: boolean;
    private _localPositionDirty: boolean;
    private _localScaleDirty: boolean;
    private _localRotationDirty: boolean;
    private _localPosition: Vector2;
    private _localRotation: number;
    private _localScale: Vector2;
    private _rotation: number;
    private _scale: Vector2;
    private _worldInverseDirty: boolean;

    private _translationMatrix: Matrix2D;
    private _rotationMatrix: Matrix2D;
    private _scaleMatrix: Matrix2D;
    private _localTransform: Matrix2D;
    private _positionDirty: boolean;
    private _position: Vector2;
    private _worldToLocalDirty: boolean;

    private _worldTransform: Matrix2D = Matrix2D.identity();
    private _worldToLocalTransform = Matrix2D.identity();

    public get childCount(): number{
        return this._children.length;
    }

    public get parent(): Transform{
        return this._parent;
    }

    public set parent(value: Transform){
        this.setParent(value);
    }

    public get rotation(){
        this.updateTransform();
        return this._rotation;
    }

    public set rotation(value: number){
        this.setRotation(value);
    }

    public get localRotation(){
        this.updateTransform();
        return this._localRotation;
    }

    public set localRotation(value: number){
        this.setLocalRotation(value);
    }

    public setRotation(radians: number): Transform{
        this._rotation = radians;
        if (this.parent != null)
            this.localRotation = this.parent.rotation + radians;
        else
            this.localRotation = radians;

        return this;
    }

    public setLocalRotation(radians: number): Transform{
        this._localRotation = radians;
        this._localDirty = this._positionDirty = this._localPositionDirty = this._localRotationDirty = this._localScaleDirty = true;
        this.setDirty(DirtyType.RotationDirty);

        return this;
    }

    public get position(): Vector2{
        this.updateTransform();
        if (this._positionDirty){
            if (this.parent == null){
                this._position = this._localPosition;
            }else{
                this.parent.updateTransform();
                this._position = Vector2Ext.transform(this._localPosition, this.parent._worldTransform, this._position);
            }

            this._positionDirty = false;
        }

        return this._position;
    }

    public set position(value: Vector2){
        this.setPosition(value);
    }

    public get localPosition(){
        this.updateTransform();
        return this._localPosition;
    }

    public set localPosition(value: Vector2){
        this.setLocalPosition(value);
    }

    public get worldToLocalTransform(): Matrix2D{
        if (this._worldInverseDirty){
            if (this.parent == null){
                this._worldToLocalTransform = Matrix2D.identity();
            }else{
                this.parent.updateTransform();
                this._worldToLocalTransform = Matrix2D.invert(this.parent._worldTransform, this._worldToLocalTransform);
            }

            this._worldToLocalDirty = false;
        }

        return this._worldToLocalTransform;
    }

    public setLocalPosition(localPosition: Vector2): Transform{
        if (localPosition == this._localPosition)
            return this;

        this._localPosition = localPosition;
        this._localDirty = this._positionDirty = this._localPositionDirty = this._localRotationDirty = this._localScaleDirty = true;
        this.setDirty(DirtyType.PositionDirty);

        return this;
    }

    public setPosition(position: Vector2): Transform{
        if (position == this._position)
            return this;

        this._position = position;
        if (this.parent != null)
            this.localPosition = Vector2.Transform(this._position, this.worldToLocalTransform);
        else
            this.localPosition = position;

        this._positionDirty = false;

        return this;
    }

    public setParent(parent: Transform): Transform{
        if (this._parent == parent)
            return this;

        if (this._parent != null){
            let parentIndex = this._parent._children.indexOf(this);
            if (parentIndex != -1)
                parent._children.splice(parentIndex, 1);
        }

        if (parent != null)
            parent._children.push(this);
            
        this._parent = parent;
        this.setDirty(DirtyType.PositionDirty);

        return this;
    }

    private _children: Array<Transform> = new Array<Transform>();
    private hierarchyDirty: DirtyType;

    private updateTransform(){
        if (this.hierarchyDirty != DirtyType.Clean){
            if (this.parent != null)
                this.parent.updateTransform();

            if (this._localDirty){
                if (this._localPositionDirty){
                    this._translationMatrix = Matrix2D.createTranslation(this._localPosition.X, this._localPosition.Y, this._translationMatrix);
                    this._localPositionDirty = false;
                }

                if (this._localRotationDirty){
                    this._rotationMatrix = Matrix2D.createRotation(this._localRotation, this._rotationMatrix);
                    this._localRotationDirty = false;
                }

                if (this._localScaleDirty){
                    this._scaleMatrix = Matrix2D.createScale(this._localScale.X, this._localScale.Y, this._scaleMatrix);
                    this._localScaleDirty = false;
                }

                this._localTransform = Matrix2D.multiply(this._scaleMatrix, this._rotationMatrix, this._localTransform);
                this._localTransform = Matrix2D.multiply(this._localTransform, this._translationMatrix, this._localTransform);

                if (this.parent == null){
                    this._worldTransform = this._localTransform;
                    this._rotation = this._localRotation;
                    this._scale = this._localScale;
                    this._worldInverseDirty = true;
                }
                this._localDirty = false;
            }

            if (this.parent != null){
                this._worldTransform = Matrix2D.multiply(this._localTransform, this.parent._worldTransform, this._worldTransform);
                this._rotation = this._localRotation + this.parent._rotation;
                this._scale = Vector2.Multipy(this.parent._scale, this._localScale);
                this._worldInverseDirty = true;
            }

            this._worldInverseDirty = true;
            this._positionDirty = true;
            this.hierarchyDirty = DirtyType.Clean;
        }
    }

    /**
     * 在枚举上设置脏标志并将其传递给子类
     *
     * @private
     * @param {DirtyType} dirtyFlagType
     * @memberof Transform
     */
    private setDirty(dirtyFlagType: DirtyType){
        if ((this.hierarchyDirty & dirtyFlagType) == 0){
            this.hierarchyDirty |= dirtyFlagType;

            switch (dirtyFlagType){
                case DirtyType.PositionDirty:
                    this.entity.onTransformChanged(TransformComponent.Position);
                    break;
                case DirtyType.RotationDirty:
                    this.entity.onTransformChanged(TransformComponent.Rotation);
                    break;
                case DirtyType.ScaleDirty:
                    this.entity.onTransformChanged(TransformComponent.Scale);
                    break;
            }

            for (let i = 0; i < this._children.length; i++) {
                this._children[i].setDirty(dirtyFlagType);
            }
        }
    }

    public getChild(index: number): Transform{
        return this._children[index];
    }
}

enum DirtyType{
    Clean,
    PositionDirty,
    ScaleDirty,
    RotationDirty
}

enum TransformComponent{
    Position,
    Scale,
    Rotation,
}