class Scene{
    /**
     * 默认场景摄像头
     *
     * @type {Camera}
     * @memberof Scene
     */
    public camera: Camera;

    /**
     * 管理当前在场景实体上的所有可渲染组件的列表
     *
     * @type {RenderableComponent}
     * @memberof Scene
     */
    public readonly renderableComponents: RenderableComponentList;
    public readonly entities: EntityList;

    public createEntity(name: string, position: Vector2 = null): Entity{
        let entity = new Entity(name);
        if (position != null)
            entity.transform.position = position;
        return this.addEntity(entity);
    }

    public addEntity(entity: Entity): Entity{
        Assert.isFalse(this.entities.contains(entity), `你正在试图添加相同的实体到同一个场景: ${entity}`);
        this.entities.add(entity);
        entity.scene = this;

        for (let i = 0; i < entity.transform.childCount; i++) {
            this.addEntity(entity.transform.getChild(i).entity);
        }

        return entity;
    }

    public findEntity(name: string): Entity{
        return this.entities.findEntity(name);
    }
}