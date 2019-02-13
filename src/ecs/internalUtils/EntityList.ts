class EntityList{
    private _entities: Array<Entity> = new Array<Entity>();
    private _entitiesToAdd: Array<Entity> = new Array<Entity>();

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
}