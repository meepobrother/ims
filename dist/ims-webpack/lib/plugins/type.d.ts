import { Visitor, NodePath } from '@babel/traverse';
import * as core from '@babel/core';
export declare type IApi = typeof core & {
    assertVersion(version: number): void;
};
export interface PluginResult {
    name: string;
    visitor: Visitor;
}
export interface PluginHandler<T = any> {
    (api: IApi, options: T): PluginResult;
}
export { NodePath };
export declare function buildPlugin<T = any>(handler: PluginHandler<T>): any;
