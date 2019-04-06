import { Visitor, NodePath } from '@babel/traverse';
import { declare } from "@babel/helper-plugin-utils";
import * as core from '@babel/core';
export type IApi = typeof core & {
    assertVersion(version: number): void;
};
export interface PluginResult {
    name: string;
    visitor: Visitor;
}
export interface PluginHandler<T=any> {
    (api: IApi, options: T): PluginResult
}
export { NodePath }
export function buildPlugin<T=any>(handler: PluginHandler<T>) {
    return declare(handler)
}