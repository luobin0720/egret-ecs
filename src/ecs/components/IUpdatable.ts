/**
 * 添加到Component的接口
 * 只要启用了Component和Entity，每个帧调用更新方法。
 *
 * @interface IUpdatable
 */
interface IUpdatable{
    enabled: boolean;
    updateOrder: number;
    update(): void;
}

/**
 * 用于排序IUpdatables的比较器
 *
 * @class IUpdatableComparer
 */
class IUpdatableComparer{
    public Compare(a: IUpdatable, b: IUpdatable){
        if(a.updateOrder == b.updateOrder){  
			return 0;
		}else if(a.updateOrder > b.updateOrder){ 
			return 1;
		}else{ 
			return -1;
		}
    }
}