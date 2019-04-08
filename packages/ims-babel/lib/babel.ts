
import { transformFileAsync, traverse } from '@babel/core';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { relative, dirname, join } from 'path'
async function babel(moduleName: string) {
    /** 解析地址 */
    const moduleResolve = require.resolve(moduleName);
    const ast = await transformFileAsync(moduleResolve, {
        ast: true,
        presets: ['@babel/preset-env']
    });
    const exportsMap: Map<string, any> = new Map();
    const requireMap: Map<string, any> = new Map();

    traverse(ast.ast, {
        enter(path) {

        },
        CallExpression: (path: NodePath<t.CallExpression>) => {
            /** 调用 */
            const callee = path.get('callee');
            /** 参数 */
            const _arguments = path.get('arguments');
            /**
             * object.property
             **/
            if (callee.isMemberExpression()) {
                const object = callee.get('object')
                const property = callee.get('property') as NodePath<t.Node>;
                if (object.isIdentifier()) {
                    /** Object.property */
                    if (object.node.name === 'Object') {
                        if (property.isIdentifier()) {
                            /** Object.defineProperty */
                            if (property.node.name === "defineProperty") {
                                /** arguments */
                                const obj = _arguments[0];
                                const prototype = _arguments[1];
                                const attributes = _arguments[2];
                                if (obj.isIdentifier()) {
                                    /** Object.defineProperty(exports,*,*) */
                                    if (obj.node.name === "exports") {
                                        if (prototype.isStringLiteral()) {
                                            /** Object.defineProperty(exports,'__esModule',*) */
                                            if (prototype.node.value === "__esModule") {
                                                /** 忽略无用信息 __esModule */
                                            } else {
                                                /** 统计sourceMap */

                                                /** {} object expression */
                                                if (attributes.isObjectExpression()) {
                                                    const objectExpression: NodePath<t.ObjectExpression> = attributes;
                                                    const properties = objectExpression.get('properties');
                                                    for (let property of properties) {
                                                        if (property.isObjectProperty()) {
                                                            const objectProperty: NodePath<t.ObjectProperty> = property;
                                                            const key = objectProperty.get('key') as NodePath<t.Node>;
                                                            const value = objectProperty.get('value');
                                                            if (key.isIdentifier()) {
                                                                /**
                                                                 * Object.defineProperty(exports, "parseSync", {
                                                                        enumerable: true,
                                                                        get: function () {
                                                                            return _parse.parseSync;
                                                                        }
                                                                    });
                                                                 **/
                                                                if (key.node.name === 'enumerable') { }
                                                                if (key.node.name === 'get') {
                                                                    if (value.isFunctionExpression()) {
                                                                        const body = value.get('body');
                                                                        if (body.isBlockStatement()) {
                                                                            const blockBody = body.get('body');
                                                                            for (let b of blockBody) {
                                                                                if (b.isReturnStatement()) {
                                                                                    const _argument = b.get('argument');
                                                                                    if (_argument.isMemberExpression()) {
                                                                                        const obj = _argument.get('object');
                                                                                        const property = _argument.get('property');
                                                                                        if (obj.isIdentifier()) {
                                                                                            const scopt = path.scope.getBinding(obj.node.name);
                                                                                            const objPath = scopt.path;
                                                                                            if (objPath.isVariableDeclarator()) {
                                                                                                // 调用函数 todo
                                                                                                const init = objPath.get('init');
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                exportsMap.set(prototype.node.value, attributes);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            /**
             * _interopRequireDefault(...args)
             */
            else if (callee.isIdentifier()) {
                for (let arg of _arguments) {
                    if (arg.isCallExpression()) {
                        const callCallee = arg.get('callee')
                        const __arguments = arg.get('arguments')
                        if (callCallee.isIdentifier()) {
                            if (callCallee.node.name === 'require') {
                                if (__arguments.length === 1) {
                                    const arg0 = __arguments[0];
                                    if (arg0.isStringLiteral()) {
                                        const pathStr = arg0.node.value;
                                        if (pathStr.startsWith('./')) {
                                            const path2 = dirname(moduleResolve);
                                            const relativeStr = join(path2, pathStr)
                                            requireMap.set(pathStr, relativeStr)
                                        } else if (pathStr.startsWith('/')) {
                                            requireMap.set(pathStr, pathStr)
                                        } else {
                                            requireMap.set(pathStr, require.resolve(pathStr))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            /**
             * 未处理 
             */
            else {
                debugger;
            }
        }
    });
    debugger;
}


babel('antd')