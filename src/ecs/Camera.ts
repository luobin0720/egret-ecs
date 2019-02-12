class Camera extends Component{
    public get position(){
        return this.entity.transform.position;
    }
}

class CameraInset{
    left: number;
    right: number;
    top: number;
    bottom: number;
}