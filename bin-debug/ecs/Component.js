var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 执行顺序：
 *  -  onAddedToEntity
 *  -  onAwake（此框架中添加的所有其他组件此时将添加到实体中)
 *  -  onEnabled
 *
 * 删除：
 *  -  onRemovedFromEntity
 *
 * @class Component
 */
var Component = (function () {
    function Component() {
        this._enabled = true;
    }
    Object.defineProperty(Component.prototype, "transform", {
        get: function () {
            return this.entity.transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "enabled", {
        /**
         * 如果启用了组件并且启用了实体，则为true。
         * 启用后，将调用此组件生命周期方法。
         * 状态的改变导致调用onEnabled / onDisable。
         *
         * @readonly
         * @memberof Component
         */
        get: function () {
            return this.entity != null ? this.entity.enabled && this._enabled : this._enabled;
        },
        set: function (value) {
            this.setEnabled(value);
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.setEnabled = function (isEnabled) {
        if (this._enabled != isEnabled) {
            this._enabled = isEnabled;
            if (this._enabled)
                this.onEnabled();
            else
                this.onDisabled();
        }
        return this;
    };
    /**
     * 启用父实体或此组件时调用
     *
     * @memberof Component
     */
    Component.prototype.onEnabled = function () { };
    Component.prototype.onDisabled = function () { };
    Component.prototype.onAddedToEntity = function () { };
    Component.prototype.onRemovedFromEntity = function () { };
    /**
     * 当实体的位置发生变化时调用。
     *
     * @param {TransformComponent} comp
     * @memberof Component
     */
    Component.prototype.onEntityTransformChanged = function (comp) { };
    return Component;
}());
__reflect(Component.prototype, "Component");
//# sourceMappingURL=Component.js.map