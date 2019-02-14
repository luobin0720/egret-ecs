class EntityProcessorList{
    protected _processors: Array<EntitySystem> = new Array<EntitySystem>();

    public onEntityRemoved(entity: Entity){
        this.removeFromProcessors(entity);
    }

    public onEntityAdded(entity: Entity){
        this.notifyEntityChanged(entity);
    }

    protected removeFromProcessors(entity: Entity){
        for (let i = 0; i < this._processors.length; i++) {
            this._processors[i].remove(entity);
        }
    }

    protected notifyEntityChanged(entity: Entity){
        for (let i = 0; i < this._processors.length; i++) {
            this._processors[i].onChange(entity);
        }
    }

    public update(){
        for (let i = 0; i < this._processors.length; i++) {
            this._processors[i].update();
        }
    }

    public lastUpdate(){
        for (let i = 0; i < this._processors.length; i++) {
            this._processors[i].lastUpdate();
        }
    }
}