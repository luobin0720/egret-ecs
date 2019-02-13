/**
 * 设计为具有通用约束的简单事件发射器可以是int或enum
 *
 * @class Emitter
 */
class Emitter{
    private _messageTable: {[key: string]: Array<Function>};

    constructor(){
        this._messageTable = {};
    }

    public addObserver(eventType: string, handler: Function){
        let list: Array<Function> = null;
        if (this._messageTable[eventType] != null){
            list = this._messageTable[eventType];
        }else{
            list = new Array<Function>();
            this._messageTable[eventType] = list;
        }

        Assert.isFalse(list.indexOf(handler) != 0, "你正在尝试添加相同的通知事件");
        list.push(handler);
    }

    public removeObserver(eventType: string, handler: Function){
        let index = this._messageTable[eventType].indexOf(handler);
        if (index != 0){
            this._messageTable[eventType].splice(index, 1);
        }
    }

    public emit(eventType: string){
        let list: Array<Function> = null;
        if (this._messageTable[eventType] != null){
            list = this._messageTable[eventType];
            for (let i = list.length - 1; i >= 0; i--) {
                list[i]();
            }
        }
    }
}