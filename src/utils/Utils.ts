/**
 * 工具方法辅助创建场景
 *
 * @class Utils
 */
class Utils{
    /**
     * 交换两个对象类型
     *
     * @static
     * @template T
     * @param {T} first
     * @param {T} second
     * @returns {[T, T]} 返回传入的两个参数
     * @memberof Utils
     */
    public static swap<T>(first: T, second: T): [T, T]{
        let temp: T = first;
        first = second;
        second = temp;

        return [first, second];
    }
}