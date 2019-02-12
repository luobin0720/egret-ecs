var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Transform = (function () {
    function Transform() {
        this._worldTransform = Matrix2D.identity();
        this._worldToLocalTransform = Matrix2D.identity();
        this._children = new Array();
    }
    Object.defineProperty(Transform.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            this.setParent(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "position", {
        get: function () {
            this.updateTransform();
            if (this._positionDirty) {
                if (this.parent == null) {
                    this._position = this._localPosition;
                }
                else {
                    this.parent.updateTransform();
                    this._position = Vector2Ext.transform(this._localPosition, this.parent._worldTransform, this._position);
                }
                this._positionDirty = false;
            }
            return this._position;
        },
        set: function (value) {
            this.setPosition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localPosition", {
        get: function () {
            this.updateTransform();
            return this._localPosition;
        },
        set: function (value) {
            this.setLocalPosition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "worldToLocalTransform", {
        get: function () {
            if (this._worldInverseDirty) {
                if (this.parent == null) {
                    this._worldToLocalTransform = Matrix2D.identity();
                }
                else {
                    this.parent.updateTransform();
                    this._worldToLocalTransform = Matrix2D.invert(this.parent._worldTransform, this._worldToLocalTransform);
                }
                this._worldToLocalDirty = false;
            }
            return this._worldToLocalTransform;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.setLocalPosition = function (localPosition) {
        if (localPosition == this._localPosition)
            return this;
        this._localPosition = localPosition;
        this._localDirty = this._positionDirty = this._localPositionDirty = this._localRotationDirty = this._localScaleDirty = true;
        this.setDirty(DirtyType.PositionDirty);
        return this;
    };
    Transform.prototype.setPosition = function (position) {
        if (position == this._position)
            return this;
        this._position = position;
        if (this.parent != null)
            this.localPosition = Vector2.Transform(this._position, this.worldToLocalTransform);
        else
            this.localPosition = position;
        this._positionDirty = false;
        return this;
    };
    Transform.prototype.setParent = function (parent) {
        if (this._parent == parent)
            return this;
        if (this._parent != null) {
            var parentIndex = this._parent._children.indexOf(this);
            if (parentIndex != -1)
                parent._children.splice(parentIndex, 1);
        }
        if (parent != null)
            parent._children.push(this);
        this._parent = parent;
        this.setDirty(DirtyType.PositionDirty);
        return this;
    };
    Transform.prototype.updateTransform = function () {
        if (this.hierarchyDirty != DirtyType.Clean) {
            if (this.parent != null)
                this.parent.updateTransform();
            if (this._localDirty) {
                if (this._localPositionDirty) {
                    this._translationMatrix = Matrix2D.createTranslation(this._localPosition.X, this._localPosition.Y, this._translationMatrix);
                    this._localPositionDirty = false;
                }
                if (this._localRotationDirty) {
                    this._rotationMatrix = Matrix2D.createRotation(this._localRotation, this._rotationMatrix);
                    this._localRotationDirty = false;
                }
                if (this._localScaleDirty) {
                    this._scaleMatrix = Matrix2D.createScale(this._localScale.X, this._localScale.Y, this._scaleMatrix);
                    this._localScaleDirty = false;
                }
                this._localTransform = Matrix2D.multiply(this._scaleMatrix, this._rotationMatrix, this._localTransform);
                this._localTransform = Matrix2D.multiply(this._localTransform, this._translationMatrix, this._localTransform);
                if (this.parent == null) {
                    this._worldTransform = this._localTransform;
                    this._rotation = this._localRotation;
                    this._scale = this._localScale;
                    this._worldInverseDirty = true;
                }
                this._localDirty = false;
            }
            if (this.parent != null) {
                this._worldTransform = Matrix2D.multiply(this._localTransform, this.parent._worldTransform, this._worldTransform);
                this._rotation = this._localRotation + this.parent._rotation;
                this._scale = Vector2.Multipy(this.parent._scale, this._localScale);
                this._worldInverseDirty = true;
            }
            this._worldInverseDirty = true;
            this._positionDirty = true;
            this.hierarchyDirty = DirtyType.Clean;
        }
    };
    /**
     * 在枚举上设置脏标志并将其传递给子类
     *
     * @private
     * @param {DirtyType} dirtyFlagType
     * @memberof Transform
     */
    Transform.prototype.setDirty = function (dirtyFlagType) {
        if ((this.hierarchyDirty & dirtyFlagType) == 0) {
            this.hierarchyDirty |= dirtyFlagType;
            switch (dirtyFlagType) {
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
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].setDirty(dirtyFlagType);
            }
        }
    };
    return Transform;
}());
__reflect(Transform.prototype, "Transform");
var DirtyType;
(function (DirtyType) {
    DirtyType[DirtyType["Clean"] = 0] = "Clean";
    DirtyType[DirtyType["PositionDirty"] = 1] = "PositionDirty";
    DirtyType[DirtyType["ScaleDirty"] = 2] = "ScaleDirty";
    DirtyType[DirtyType["RotationDirty"] = 3] = "RotationDirty";
})(DirtyType || (DirtyType = {}));
var TransformComponent;
(function (TransformComponent) {
    TransformComponent[TransformComponent["Position"] = 0] = "Position";
    TransformComponent[TransformComponent["Scale"] = 1] = "Scale";
    TransformComponent[TransformComponent["Rotation"] = 2] = "Rotation";
})(TransformComponent || (TransformComponent = {}));
//# sourceMappingURL=Transform.js.map