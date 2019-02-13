class Core extends eui.UILayer{
    public static emitter: Emitter;
    public static entitySystemEnabled: boolean;
    public static pauseOnFocusLost: boolean = true;
    private static _instance: Core;
    private _scene: Scene;
    private _nextScene: Scene;
    public static get scene(){
        return this._instance._scene;
    }

    public static set scene(value: Scene){
        this._instance._nextScene = value;
    }

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            this.addLifecycleListener(context);
        })

        egret.lifecycle.onPause = () => {
            this.onPause();
        }

        egret.lifecycle.onResume = () => {
            this.onResume();
        }
    }

    /**
     * 在子类中可进行重写来实现对生命周期的操作
     *
     * @protected
     * @param {*} context
     * @memberof Core
     */
    protected addLifecycleListener(context: any){

    }

    /**
     * 在子类中可进行重写
     *
     * @protected
     * @memberof Core
     */
    protected onResume(){
        egret.ticker.resume();
    }

    protected onPause(){
        if (Core.pauseOnFocusLost)
            egret.ticker.pause();
    }
}