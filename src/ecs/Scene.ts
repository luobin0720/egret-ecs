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
}