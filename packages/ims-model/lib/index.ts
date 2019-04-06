import { Addon } from 'ims-core';
// 数据库
export * from './typeorm';
import { ImsModelTypeorm } from './typeorm';
@Addon({
    typeorm: ImsModelTypeorm,
    sourceRoot: __dirname
})
export class ImsModel { }
