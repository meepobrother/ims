import { Action, Store } from 'redux';
import { IRouter } from './router';
export interface IState {
    routes: IRouter[];
}
export interface IAction<T = any> extends Action {
    payload: T;
}
export declare const store: Store<IState, IAction>;
