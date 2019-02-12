var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ComponentList = (function () {
    function ComponentList(entity) {
        /**
         * 添加到实体的组件列表
         *
         * @private
         * @type {Array<Component>}
         * @memberof ComponentList
         */
        this._components = new Array();
        /**
         * 要调用更新的所有组件的列表
         *
         * @private
         * @type {Array<IUpdatable>}
         * @memberof ComponentList
         */
        this._updatableComponents = new Array();
        /**
         * 此框架中添加的组件列表。 用于对组件进行分组，以便我们可以同时处理它们
         *
         * @private
         * @type {Array<Component>}
         * @memberof ComponentList
         */
        this._componentsToAdd = new Array();
        /**
         * 标记为删除此框架的组件列表。 用于对组件进行分组，以便我们可以同时处理它们
         *
         * @private
         * @type {Array<Component>}
         * @memberof ComponentList
         */
        this._componentsToRemove = new Array();
        this._tempBufferList = new Array();
        this._entity = entity;
    }
    Object.defineProperty(ComponentList.prototype, "count", {
        get: function () {
            return this._components.length;
        },
        enumerable: true,
        configurable: true
    });
    ComponentList.prototype.markEntityListUnsorted = function () {
        this._isComponentListUnsorted = true;
    };
    ComponentList.prototype.add = function (component) {
        this._componentsToAdd.push(component);
    };
    ComponentList.prototype.remove = function (component) {
        Debug.warnIf(this._componentsToRemove.indexOf(component) != -1, "\u60A8\u6B63\u5728\u5C1D\u8BD5\u5220\u9664\u5DF2\u5220\u9664\u7684\u7EC4\u4EF6\uFF08" + component + "\uFF09");
        // 这可能不是一个实时组件，因此我们必须注意它是否尚未处理但是它在相同的框架中被删除
        var componentIndex = this._componentsToAdd.indexOf(component);
        if (componentIndex != -1) {
            this._componentsToAdd.splice(componentIndex, 1);
            return;
        }
        this._componentsToRemove.push(component);
    };
    /**
     * 立即从组件列表中删除所有组件
     *
     * @memberof ComponentList
     */
    ComponentList.prototype.removeAllComponents = function () {
        for (var i = 0; i < this._components.length; i++)
            this.handleRemove(this._components[i]);
        this._components.splice(0);
        this._updatableComponents.splice(0);
        this._componentsToAdd.splice(0);
        this._componentsToRemove.splice(0);
    };
    ComponentList.prototype.deregisterAllComponents = function () {
        for (var i = 0; i < this._components.length; i++) {
            var component = this._components[i];
            // 必要时处理renderLayer列表
            if (component instanceof RenderableComponent)
                this._entity.scene.renderableComponents.remove(component);
        }
    };
    ComponentList.prototype.handleRemove = function (component) {
        if (component instanceof RenderableComponent)
            this._entity.scene.renderableComponents.remove(component);
        if (egret.is(component, "IUpdatable")) {
            var index = this._updatableComponents.indexOf(component);
            if (index != 0)
                this._updatableComponents.splice(index, 1);
        }
        if (Core.entitySystemEnabled) {
        }
        component.onRemovedFromEntity();
        component.entity = null;
    };
    ComponentList.prototype.onEntityTransformChanged = function (comp) {
        for (var i = 0; i < this._components.length; i++) {
            if (this._components[i].enabled)
                this._components[i].onEntityTransformChanged(comp);
        }
    };
    ComponentList.prototype.onEntityEnabled = function () {
        for (var i = 0; i < this._components.length; i++) {
            this._components[i].onEnabled();
        }
    };
    ComponentList.prototype.onEntityDisabled = function () {
        for (var i = 0; i < this._components.length; i++) {
            this._components[i].onDisabled();
        }
    };
    /**
     * 全局updateOrder排序IUpdatable列表
     *
     * @private
     * @static
     * @type {IUpdatableComparer}
     * @memberof ComponentList
     */
    ComponentList.compareUpdatableOrder = new IUpdatableComparer();
    return ComponentList;
}());
__reflect(ComponentList.prototype, "ComponentList");
//# sourceMappingURL=ComponentList.js.map