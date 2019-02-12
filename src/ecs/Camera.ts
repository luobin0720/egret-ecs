class Camera extends Component{
    public get position(){
        return this.entity.transform.position;
    }

    public set position(value: Vector2){
        this.entity.transform.position = value;
    }

    public get rotation(){
        return this.entity.transform.rotation;
    }

    public set rotation(value: number){
        this.entity.transform.rotation = value;
    }

    private _zoom: number;
    private _areBoundsDirty: boolean = true;
    public get rawZoom(): number{
        return this._zoom;
    }

    public set rawZoom(value: number){
        if (value != this._zoom){
            this._zoom = value;
            this._areBoundsDirty = true;
        }
    }
}

class CameraInset{
    left: number;
    right: number;
    top: number;
    bottom: number;
}