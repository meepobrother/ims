export * from './socket';
export * from './app';
export * from './inject';
export * from './injectable';
export * from './input';
export * from './methods/index';
export * from './addon/index';
export * from './orm/index';
export * from './module';
export * from './store/index';
export * from './cookie';
export * from './p2p';

import { QueryRunner } from 'typeorm';
export interface IQueryRunner extends QueryRunner { }
export interface IResult<T> {
    code: 0 | -1;
    message: string;
    data?: T;
    stack?: string;
}
export type HttpResult<T = any> = Promise<IResult<T>>;
