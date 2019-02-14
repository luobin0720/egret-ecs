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
    private _tag: number = 0;
    public componentBits: BitSet;
    public _isDestoryed: boolean;

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

    public get tag(){
        return this._tag;
    }

    public set tag(value: number){
        this.setTag(value);
    }

    constructor(name: string){
        this.name = name;
    }

    public setTag(tag: number): Entity{
        if (this._tag != tag){
            if (this.scene != null)
                this.scene.entities.removeFromTagList(this);
            
            this._tag = tag;
            if (this.scene != null)
                this.scene.entities.addToTagList(this);
        }

        return this;
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

    public update(){
        this.components.update();
    }

    public onTransformChanged(comp: TransformComponent){
        this.components.onEntityTransformChanged(comp);
    }

    /**
     * 从场景中删除此实体时调用
     *
     * @memberof Entity
     */
    public onRemovedFromScene(){
        // 如果我们被销毁，则删除我们的组件。 如果我们只是分离出场景，我们需要将我们的组件保留在实体上。
        if (this._isDestoryed)
            this.components.removeAllComponents();
    }

    /**
     * 在提交所有挂起的实体更改后将此实体添加到场景时调用
     *
     * @memberof Entity
     */
    public onAddedToScene(){}
}