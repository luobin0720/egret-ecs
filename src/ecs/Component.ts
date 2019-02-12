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
class Component{

    /**
     * 此组件附加到的实体
     *
     * @type {Entity}
     * @memberof Component
     */
    public entity: Entity;

    public get transform(){
        return this.entity.transform;
    }

    private _enabled: boolean = true;

    /**
     * 如果启用了组件并且启用了实体，则为true。 
     * 启用后，将调用此组件生命周期方法。 
     * 状态的改变导致调用onEnabled / onDisable。
     *
     * @readonly
     * @memberof Component
     */
    public get enabled(): boolean{
        return this.entity != null ? this.entity.enabled && this._enabled : this._enabled;
    }

    public set enabled(value: boolean){
        this.setEnabled(value);
    }

    public setEnabled(isEnabled: boolean): Component{
        if (this._enabled != isEnabled){
            this._enabled = isEnabled;

            if (this._enabled)
                this.onEnabled();
            else
                this.onDisabled();
        }

        return this;
    }

    /**
     * 启用父实体或此组件时调用
     *
     * @memberof Component
     */
    public onEnabled(){}

    public onDisabled(){}

    public onAddedToEntity(){}

    public onRemovedFromEntity(){}

    /**
     * 当实体的位置发生变化时调用。 
     *
     * @param {TransformComponent} comp
     * @memberof Component
     */
    public onEntityTransformChanged(comp: TransformComponent){}
}