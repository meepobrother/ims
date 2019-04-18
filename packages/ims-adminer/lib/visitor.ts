import { visitor } from 'ims-common';
import { Type } from 'ims-decorator'
import { GetPropertyAst, ControllerAst, ControllerMetadataKey, PostPropertyAst } from 'ims-core';
import util from 'ims-util';
export function parseInc<T>(inc: Type<T>): T {
    const context = visitor.visitType(inc);
    const incAst = context.getClass(ControllerMetadataKey) as ControllerAst;
    context.getProperty().map(pro => {
        if (pro instanceof GetPropertyAst) {
            context.instance[pro.ast.propertyKey] = (...args: any[]) => {
                util.http.get(`${incAst.path}${pro.path || `/${pro.ast.propertyKey as string}`}}`, {
                    params: {
                        args: args
                    }
                }).then(res => res.data)
            };
        }
        if (pro instanceof PostPropertyAst) {
            context.instance[pro.ast.propertyKey] = (...args: any[]) => {
                util.http.post(`${incAst.path}${pro.path || `/${pro.ast.propertyKey as string}`}`, {
                    args: args
                }).then(res => res.data);
            };
        }
    });
    return context.instance;
}