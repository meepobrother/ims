import { createStore, Reducer, Action, Store } from 'redux';
import { IRouter } from './router';
export interface IState {
    routes: IRouter[];
}
export interface IAction<T=any> extends Action {
    payload: T;
}
const reducer: Reducer<IState, IAction> = (state: IState = {
    routes: []
}, action: IAction) => {
    switch (action.type) {
        default:
            return action.payload;
    }
}
export const store: Store<IState, IAction> = createStore(reducer);
