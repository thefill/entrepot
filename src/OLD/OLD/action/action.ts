/**
 * Introduces procedures that trigger modifications of data, similar to
 * actions in Redux, recorded in the global timeline history
 */
export class Action<T = any> {
    // TODO: implement
    // TODO: add locking action - action that can be in the progress eg. for async operations

    public setAction(actionName: string, callback: () => Promise<any> | any | void): void {
        // TODO: implement setAction
        return;
    }

    public do(actionName: string, value?: any): Promise<any> | any | void {
        // TODO: implement do
        return;
    }
}
