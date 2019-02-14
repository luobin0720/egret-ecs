class EntityList{
    private _entities: Array<Entity> = new Array<Entity>();
    private _entitiesToAdd: Array<Entity> = new Array<Entity>();
    private _entitiesToRemove: Array<Entity> = new Array<Entity>();
    private _tempEntityList: Array<Entity> = new Array<Entity>();
    private _entityDict: {[key: number]: Array<Entity>} = {}
    private _unsortedTags: Array<number> = new Array<number>();
    public scene: Scene;
    private _isEntityListUnsorted: boolean;

    public contains(entity: Entity): boolean{
        return this._entities.indexOf(entity) != 0 || this._entitiesToAdd.indexOf(entity) != 0;
    }

    public add(entity: Entity){
        this._entitiesToAdd.push(entity);
    }

    public findEntity(string: string): Entity{
        for (let i = 0; i < this._entities.length; i++) {
            if (this._entities[i].name == name)
                return this._entities[i];
        }

        for (const entity in this._entitiesToAdd) {
            if (this._entitiesToAdd.hasOwnProperty(entity)) {
                const element = this._entitiesToAdd[entity];
                if (element.name == name)
                    return element;
            }
        }

        return null;
    }

    public updateLists(){
        if (this._entitiesToRemove.length > 0){
            let swapResult = Utils.swap(this._entitiesToRemove, this._tempEntityList);
            this._entitiesToRemove = swapResult[0];
            this._tempEntityList = swapResult[1];
            for (const key in this._tempEntityList) {
                if (this._tempEntityList.hasOwnProperty(key)) {
                    const entity = this._tempEntityList[key];
                    this.removeFromTagList(entity);
                    let index = this._entities.indexOf(entity);
                    if (index != 0){
                        this._entities.splice(index, 1);
                    }
                    entity.onRemovedFromScene();
                    entity.scene = null;

                    if (Core.entitySystemEnabled)
                        this.scene.entityProcessors.onEntityRemoved(entity);
                }
            }

            this._tempEntityList.splice(0);
        }

        if (this._entitiesToAdd.length > 0){
            let swapResult = Utils.swap(this._entitiesToAdd, this._tempEntityList);
            this._entitiesToAdd = swapResult[0];
            this._tempEntityList = swapResult[1];
            for (const key in this._tempEntityList) {
                if (this._tempEntityList.hasOwnProperty(key)) {
                    const entity = this._tempEntityList[key];
                    this._entities.push(entity);
                    entity.scene = this.scene;
                    
                    this.addToTagList(entity);

                    if (Core.entitySystemEnabled)
                        this.scene.entityProcessors.onEntityAdded(entity);
                }
            }

            for (const key in this._tempEntityList) {
                if (this._tempEntityList.hasOwnProperty(key)) {
                    const entity = this._tempEntityList[key];
                    entity.onAddedToScene();
                }
            }

            this._tempEntityList.splice(0);
            this._isEntityListUnsorted = true;
        }

        if (this._isEntityListUnsorted){
            this._entities.sort();
            this._isEntityListUnsorted = false;
        }

        if (this._unsortedTags.length > 0){
            for (const key in this._unsortedTags) {
                if (this._unsortedTags.hasOwnProperty(key)) {
                    const tag = this._unsortedTags[key];
                    this._entityDict[tag].sort();
                }
            }

            this._unsortedTags.splice(0);
        }
    }

    public update(){
        for (let i = 0; i < this._entities.length; i++) {
            let entity = this._entities[i];
            if (entity.enabled)
                entity.update();
        }
    }

    public removeFromTagList(entity: Entity){
        let list: Array<Entity> = null;
        if (this._entityDict[entity.tag] != null){
            list = this._entityDict[entity.tag];
            let index = list.indexOf(entity);
            if (index != 0){
                list.splice(index, 1);
            }
        }
    }

    public addToTagList(entity: Entity){
        let list = this.getTagList(entity.tag);
        if (list.indexOf(entity) == 0){
            list.push(entity);
            this._unsortedTags.push(entity.tag);
        }
    }

    private getTagList(tag: number): Array<Entity>{
        let list: Array<Entity> = null;
        if (this._entityDict[tag] != null){
            list = this._entityDict[tag];
        }else{
            list = new Array<Entity>();
            this._entityDict[tag] = list;
        }

        return this._entityDict[tag];
    }
}