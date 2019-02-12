/**
 * 
 * IRenderable的具体实现
 * 子类必须覆盖宽度/高度或边界！
 *
 * @abstract
 * @class RenderableComponent
 * @extends {Component}
 */
abstract class RenderableComponent extends Component implements IRenderable {
    private _layerDepth: number;
    private _renderLayer: number;
    private _isVisible: boolean;

    public get layerDepth(): number{
        return this._layerDepth;
    }

    public set layerDepth(value: number){
        this.setLayerDepth(value);
    }

    public get renderLayer(){
        return this._renderLayer;
    }

    public set renderLayer(value: number){
        this.setRenderLayer(value);
    }

    public get isVisible(): boolean{
        return this._isVisible;
    }

    public set isVisible(value: boolean){
        if (this._isVisible != value){
            this._isVisible = value;

            if (this._isVisible)
                this.onBecameVisible();
            else
                this.onBecameInvisible();
        }
    }

    public material: egret.Bitmap;

    public onBecameVisible(){}

    public onBecameInvisible(){}

    public setLayerDepth(layerDepth: number): RenderableComponent{
        this._layerDepth = Mathf.clamp01(layerDepth);

        if (this.entity != null && this.entity.scene != null)
            this.entity.scene.renderableComponents.setRenderLayerNeedsComponentSort(this.renderLayer);

        return this;
    }

    public setRenderLayer(renderLayer: number): RenderableComponent{
        if (renderLayer != this._renderLayer){
            let oldRenderLayer = this._renderLayer;
            this._renderLayer = renderLayer;

            if (this.entity != null && this.entity.scene != null)
                this.entity.scene.renderableComponents.updateRenderableRenderLayer(this, oldRenderLayer, this._renderLayer);
        }

        return this;
    }

    public getMaterial<T>(): egret.Bitmap{
        return this.material;
    }
}