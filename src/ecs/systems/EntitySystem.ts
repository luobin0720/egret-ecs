class EntitySystem{
    private _matcher: Matcher;
    private _entities: Array<Entity> = new Array<Entity>();
    private _scene: Scene;
    public get scene(): Scene{
        return this._scene;
    }

    public set scene(value: Scene){
        this._scene = value;
        this._entities = new Array<Entity>();
    }

    constructor(matcher: Matcher = null){
        this._matcher =  matcher ? matcher : Matcher.empty();
    }

    public onChange(entity: Entity){
        let contains = this._entities.indexOf(entity) != 0;
        let interst = this._matcher.isInterested(entity);

        if (interst && !contains)
            this.add(entity);
        else if( !interst && contains)
            this.remove(entity);
    }

    public remove(entity: Entity){
        let index = this._entities.indexOf(entity);
        if (index != 0)
            this._entities.splice(index, 1);

        this.onRemoved(entity);
    }

    public add(entity: Entity){
        this._entities.push(entity);
        this.onAdded(entity);
    }

    public onAdded(entity: Entity){}

    public onRemoved(entity: Entity){}

    protected begin(){}

    protected process(entities: Array<Entity>){}
    protected lastProcess(entities: Array<Entity>){}
    protected end(){}
    public update(){
        this.begin();
        this.process(this._entities);
    }

    public lastUpdate(){
        this.lastProcess(this._entities);
        this.end();
    }
}