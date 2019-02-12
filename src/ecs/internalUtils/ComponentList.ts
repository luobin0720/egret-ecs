class ComponentList{
    /**
     * 全局updateOrder排序IUpdatable列表
     *
     * @private
     * @static
     * @type {IUpdatableComparer}
     * @memberof ComponentList
     */
    private static compareUpdatableOrder: IUpdatableComparer = new IUpdatableComparer();

    private _entity: Entity;

    /**
     * 添加到实体的组件列表
     *
     * @private
     * @type {Array<Component>}
     * @memberof ComponentList
     */
    private _components: Array<Component> = new Array<Component>();

    /**
     * 要调用更新的所有组件的列表
     *
     * @private
     * @type {Array<IUpdatable>}
     * @memberof ComponentList
     */
    private _updatableComponents: Array<IUpdatable> = new Array<IUpdatable>();

    /**
     * 此框架中添加的组件列表。 用于对组件进行分组，以便我们可以同时处理它们
     *
     * @private
     * @type {Array<Component>}
     * @memberof ComponentList
     */
    private _componentsToAdd: Array<Component> = new Array<Component>();

    /**
     * 标记为删除此框架的组件列表。 用于对组件进行分组，以便我们可以同时处理它们
     *
     * @private
     * @type {Array<Component>}
     * @memberof ComponentList
     */
    private _componentsToRemove: Array<Component> = new Array<Component>();

    private _tempBufferList: Array<Component> = new Array<Component>();

    /**
     * 用于确定我们是否需要对此框架中的组件进行排序的标志
     *
     * @private
     * @type {boolean}
     * @memberof ComponentList
     */
    private _isComponentListUnsorted: boolean;

    public constructor(entity: Entity){
        this._entity = entity;
    }

    public get count(): number{
        return this._components.length;
    }

    public markEntityListUnsorted(){
        this._isComponentListUnsorted = true;
    }

    public add(component: Component){
        this._componentsToAdd.push(component);
    }

    public remove(component: Component){
        Debug.warnIf(this._componentsToRemove.indexOf(component) != -1, `您正在尝试删除已删除的组件（${component}）`);

        // 这可能不是一个实时组件，因此我们必须注意它是否尚未处理但是它在相同的框架中被删除
        let componentIndex = this._componentsToAdd.indexOf(component);
        if (componentIndex != -1){
            this._componentsToAdd.splice(componentIndex, 1);
            return;
        }

        this._componentsToRemove.push(component);
    }

    /**
     * 立即从组件列表中删除所有组件
     *
     * @memberof ComponentList
     */
    public removeAllComponents(){
        for (let i = 0; i < this._components.length; i++)
            this.handleRemove(this._components[i]);

        this._components.splice(0);
        this._updatableComponents.splice(0);
        this._componentsToAdd.splice(0);
        this._componentsToRemove.splice(0);
    }

    public deregisterAllComponents(){
        for (let i = 0; i < this._components.length; i ++){
            let component = this._components[i];

            // 必要时处理renderLayer列表
            if (component instanceof RenderableComponent)
                this._entity.scene.renderableComponents.remove(<RenderableComponent>component);
        }
    }

    private handleRemove(component: any){
        if (component instanceof RenderableComponent)
            this._entity.scene.renderableComponents.remove(component as RenderableComponent);

        if (egret.is(component, "IUpdatable")){
            let index = this._updatableComponents.indexOf(component as IUpdatable);
            if (index != 0)
                this._updatableComponents.splice(index, 1);
        }

        if (Core.entitySystemEnabled){
            
        }

        (component as Component).onRemovedFromEntity();
        (component as Component).entity = null;
    }

    public onEntityTransformChanged(comp: TransformComponent){
        for (let i = 0; i < this._components.length; i ++ ){
            if (this._components[i].enabled)
                this._components[i].onEntityTransformChanged(comp);
        }
    }

    public onEntityEnabled(){
        for (let i = 0; i < this._components.length; i ++){
            this._components[i].onEnabled();
        }
    }

    public onEntityDisabled(){
        for (let i = 0; i < this._components.length; i++) {
            this._components[i].onDisabled();
        }
    }
}