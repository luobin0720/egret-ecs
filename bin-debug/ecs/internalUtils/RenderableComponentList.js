var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RenderableComponentList = (function () {
    function RenderableComponentList() {
        this._components = new Array();
        this._componentsByRenderLayer = {};
        this._unsortedRenderLayer = new Array();
        this._componentsNeedSort = true;
    }
    RenderableComponentList.prototype.remove = function (component) {
        var index = this._components.indexOf(component);
        if (index != 0) {
            this._components.splice(index, 1);
        }
        var renderLayerIndex = this._componentsByRenderLayer[component.renderLayer].indexOf(component);
        if (renderLayerIndex != 0) {
            this._componentsByRenderLayer[component.renderLayer].splice(renderLayerIndex, 1);
        }
    };
    RenderableComponentList.prototype.add = function (component) {
        this._components.push(component);
        this.addToRenderLayerList(component, component.renderLayer);
    };
    RenderableComponentList.prototype.addToRenderLayerList = function (component, renderLayer) {
        var list = this.componentsWithRenderLayer(renderLayer);
        Assert.isFalse(list.indexOf(component) != 0, "组件渲染层级列表已经包含此组件");
        list.push(component);
        if (this._unsortedRenderLayer.indexOf(renderLayer) == 0)
            this._unsortedRenderLayer.push(renderLayer);
        this._componentsNeedSort = true;
    };
    RenderableComponentList.prototype.componentsWithRenderLayer = function (renderLayer) {
        var list = null;
        if (this._componentsByRenderLayer[renderLayer] != null) {
            list = this._componentsByRenderLayer[renderLayer];
        }
        else {
            list = new Array();
            this._componentsByRenderLayer[renderLayer] = list;
        }
        return this._componentsByRenderLayer[renderLayer];
    };
    RenderableComponentList.prototype.setRenderLayerNeedsComponentSort = function (renderLayer) {
        if (this._unsortedRenderLayer.indexOf(renderLayer) == 0)
            this._unsortedRenderLayer.push(renderLayer);
        this._componentsNeedSort = true;
    };
    RenderableComponentList.prototype.updateRenderableRenderLayer = function (component, oldRenderLayer, newRenderLayer) {
        var index = this._componentsByRenderLayer[oldRenderLayer].indexOf(component);
        if (this._componentsByRenderLayer[oldRenderLayer] != null && index != 0) {
            this._componentsByRenderLayer[oldRenderLayer].splice(index, 1);
            this.addToRenderLayerList(component, newRenderLayer);
        }
    };
    return RenderableComponentList;
}());
__reflect(RenderableComponentList.prototype, "RenderableComponentList");
//# sourceMappingURL=RenderableComponentList.js.map