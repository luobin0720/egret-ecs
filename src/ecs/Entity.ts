class Entity{
    /**
     * 这个实体所属的场景
     *
     * @type {Scene}
     * @memberof Entity
     */
    public scene: Scene;

    /**
     * 实体名称。 对于实体的场景搜索很有用
     *
     * @type {string}
     * @memberof Entity
     */
    public name: string;

    /** 
     * 封装实体的位置/旋转/比例，并允许设置层次结构
     *
     * @type {Transform}
     * @memberof Entity
     */
    public readonly transform: Transform;

    /**
     * 当前附加到此实体的所有组件的列表
     *
     * @type {ComponentList}
     * @memberof Entity
     */
    public readonly components: ComponentList;

    private _enabled: boolean = true;

    /**
     * 启用/禁用实体。 当从物理系统中删除禁用的对撞机时，将不会调用组件方法
     *
     * @readonly
     * @memberof Entity
     */
    public get enabled(){
        return this._enabled;
    }

    public set enabled(value: boolean){
        this.setEnabled(value);
    }

    public setEnabled(isEnabled: boolean): Entity{
        if (this._enabled != isEnabled){
            this._enabled = isEnabled;

            if (this._enabled){
                this.components.onEntityEnabled();
            }else{
                this.components.onEntityDisabled();
            }
        }

        return this;
    }

    public onTransformChanged(comp: TransformComponent){
        this.components.onEntityTransformChanged(comp);
    }
}