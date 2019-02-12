/**
 * 应用于Component的接口将注册它以由Scene Renderers呈现。 
 * 该接口谨慎使用。更改layerDepth / renderLayer / material之类的东西需要更新Scene RenderableComponentList
 *
 * @interface IRenderable
 */
interface IRenderable{

    // egret 由DisplayObjectContainer来接管
    // bounds: Rectangle;
    
    /**
     * 是否应该提交此IRenderable
     * 
     * @type {boolean}
     * @memberof IRenderable
     */
    enabled: boolean;

    /**
     * 标准Batcher layerdepth。 0在前面，1在后面。 
     * 更改此值将在场景中触发renderableComponents列表。
     *
     * @type {number}
     * @memberof IRenderable
     */
    layerDepth: number;

    /**
     * 较低的renderLayers位于前面，而较高的renderLayers位于后面。 
     *
     * @type {number}
     * @memberof IRenderable
     */
    renderLayer: number;

    /**
     * Renderers用来指定如何渲染此精灵。 如果为非null，则在从实体中删除Component时会自动处理它
     *
     * @type {egret.Bitmap}
     * @memberof IRenderable
     */
    material: egret.Bitmap;

    /**
     * 这个Renderable的可见性。 状态的变化最终调用onBecameVisible / onBecameInvisible方法
     *
     * @type {boolean}
     * @memberof IRenderable
     */
    isVisible: boolean;

    /**
     * 用于检索的Material子类的帮助器
     *
     * @template T
     * @returns {T}
     * @memberof IRenderable
     */
    getMaterial<T>(): egret.Bitmap;
}