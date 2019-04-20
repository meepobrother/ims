import { Type } from 'ims-decorator';
import { visitor } from 'ims-common';
import { InjectAst, EntityRepositoryAst } from 'ims-core';
export class Injector {
    // 给我一个类型为type的实例
    static get<T>(type: Type<T>): T {
        // 如果有装饰器装饰的
        const context = visitor.visitType(type)
        if (context) {
            context.getController().map(contr => {
                debugger;
            })
            context.getProperty().map(par => {
                // 如果是Inject
                if (par instanceof InjectAst) {
                    const def = par.ast.metadataDef || par.ast.propertyType;
                    context.instance[par.ast.propertyKey] = this.get(def);
                }
                // 如果是Entity
                if (par instanceof EntityRepositoryAst) {
                    const def = par.ast.metadataDef;
                    context.instance[par.ast.propertyKey] = this.get(def.target);
                }
            })
            debugger;
        }
        // 直接new 一个返回
        return new type();
    }
}
