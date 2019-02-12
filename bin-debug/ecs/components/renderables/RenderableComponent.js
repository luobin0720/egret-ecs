var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * IRenderable的具体实现
 * 子类必须覆盖宽度/高度或边界！
 *
 * @abstract
 * @class RenderableComponent
 * @extends {Component}
 */
var RenderableComponent = (function (_super) {
    __extends(RenderableComponent, _super);
    function RenderableComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RenderableComponent.prototype, "layerDepth", {
        get: function () {
            return this._layerDepth;
        },
        set: function (value) {
            this.setLayerDepth(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderableComponent.prototype, "renderLayer", {
        get: function () {
            return this._renderLayer;
        },
        set: function (value) {
            this.setRenderLayer(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderableComponent.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            if (this._isVisible != value) {
                this._isVisible = value;
                if (this._isVisible)
                    this.onBecameVisible();
                else
                    this.onBecameInvisible();
            }
        },
        enumerable: true,
        configurable: true
    });
    RenderableComponent.prototype.onBecameVisible = function () { };
    RenderableComponent.prototype.onBecameInvisible = function () { };
    RenderableComponent.prototype.setLayerDepth = function (layerDepth) {
        this._layerDepth = Mathf.clamp01(layerDepth);
        if (this.entity != null && this.entity.scene != null)
            this.entity.scene.renderableComponents.setRenderLayerNeedsComponentSort(this.renderLayer);
        return this;
    };
    RenderableComponent.prototype.setRenderLayer = function (renderLayer) {
        if (renderLayer != this._renderLayer) {
            var oldRenderLayer = this._renderLayer;
            this._renderLayer = renderLayer;
            if (this.entity != null && this.entity.scene != null)
                this.entity.scene.renderableComponents.updateRenderableRenderLayer(this, oldRenderLayer, this._renderLayer);
        }
        return this;
    };
    RenderableComponent.prototype.getMaterial = function () {
        return this.material;
    };
    return RenderableComponent;
}(Component));
__reflect(RenderableComponent.prototype, "RenderableComponent", ["IRenderable"]);
//# sourceMappingURL=RenderableComponent.js.map