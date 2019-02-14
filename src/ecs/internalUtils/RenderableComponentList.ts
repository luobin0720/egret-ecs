class RenderableComponentList{
    private _components: Array<IRenderable> = new Array<IRenderable>();
    private _componentsByRenderLayer: {[key: number]: Array<IRenderable>} = {};
    private _unsortedRenderLayer: Array<number> = new Array<number>();
    private _componentsNeedSort = true;

    public remove(component: IRenderable){
        let index = this._components.indexOf(component);
        if (index != 0){
            this._components.splice(index, 1);
        }

        let renderLayerIndex = this._componentsByRenderLayer[component.renderLayer].indexOf(component);
        if (renderLayerIndex != 0){
            this._componentsByRenderLayer[component.renderLayer].splice(renderLayerIndex, 1);
        }
    }

    public add(component: IRenderable){
        this._components.push(component);
        this.addToRenderLayerList(component, component.renderLayer);
    }

    private addToRenderLayerList(component: IRenderable, renderLayer: number){
        let list = this.componentsWithRenderLayer(renderLayer);
        Assert.isFalse(list.indexOf(component) != 0, "组件渲染层级列表已经包含此组件");

        list.push(component);
        if (this._unsortedRenderLayer.indexOf(renderLayer) == 0)
            this._unsortedRenderLayer.push(renderLayer);
        this._componentsNeedSort = true;
    }

    public componentsWithRenderLayer(renderLayer: number): Array<IRenderable>{
        let list: Array<IRenderable> = null;
        if (this._componentsByRenderLayer[renderLayer] != null){
            list = this._componentsByRenderLayer[renderLayer];
        }else{
            list = new Array<IRenderable>();
            this._componentsByRenderLayer[renderLayer] = list;
        }

        return this._componentsByRenderLayer[renderLayer];
    }

    public setRenderLayerNeedsComponentSort(renderLayer: number){
        if (this._unsortedRenderLayer.indexOf(renderLayer) == 0)
            this._unsortedRenderLayer.push(renderLayer);
        this._componentsNeedSort = true;
    }

    public updateRenderableRenderLayer(component: IRenderable, oldRenderLayer: number, newRenderLayer: number){
        let index = this._componentsByRenderLayer[oldRenderLayer].indexOf(component);
        if (this._componentsByRenderLayer[oldRenderLayer] != null && index != 0){
            this._componentsByRenderLayer[oldRenderLayer].splice(index, 1);
            this.addToRenderLayerList(component, newRenderLayer);
        }
    }

    public updateLists(){
        // TODO: sortList

        if (this._unsortedRenderLayer.length > 0){
            for (let i = 0, count = this._unsortedRenderLayer.length; i < count; i++) {
                let renderLayerComponents: Array<IRenderable>;
                if (this._componentsByRenderLayer[this._unsortedRenderLayer[i]] != null){
                    renderLayerComponents = this._componentsByRenderLayer[this._unsortedRenderLayer[i]];
                    renderLayerComponents.sort();   // TODO: icompareable
                }
            }

            this._unsortedRenderLayer.splice(0);
        }
    }
}