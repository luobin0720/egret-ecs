var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity = (function () {
    function Entity() {
        this._enabled = true;
    }
    Object.defineProperty(Entity.prototype, "enabled", {
        /**
         * 启用/禁用实体。 当从物理系统中删除禁用的对撞机时，将不会调用组件方法
         *
         * @readonly
         * @memberof Entity
         */
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this.setEnabled(value);
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.setEnabled = function (isEnabled) {
        if (this._enabled != isEnabled) {
            this._enabled = isEnabled;
            if (this._enabled) {
                this.components.onEntityEnabled();
            }
            else {
                this.components.onEntityDisabled();
            }
        }
        return this;
    };
    Entity.prototype.onTransformChanged = function (comp) {
        this.components.onEntityTransformChanged(comp);
    };
    return Entity;
}());
__reflect(Entity.prototype, "Entity");
//# sourceMappingURL=Entity.js.map