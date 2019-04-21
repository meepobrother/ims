"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
class Injector {
    // 给我一个类型为type的实例
    static get(type) {
        // 如果有装饰器装饰的
        const context = ims_common_1.visitor.visitType(type);
        if (context) {
            context.getController().map(contr => {
                debugger;
            });
            context.getProperty().map(par => {
                // 如果是Inject
                if (par instanceof ims_core_1.InjectAst) {
                    const def = par.ast.metadataDef || par.ast.propertyType;
                    context.instance[par.ast.propertyKey] = this.get(def);
                }
                // 如果是Entity
                if (par instanceof ims_core_1.EntityRepositoryAst) {
                    const def = par.ast.metadataDef;
                    context.instance[par.ast.propertyKey] = this.get(def.target);
                }
            });
            debugger;
        }
        // 直接new 一个返回
        return new type();
    }
}
exports.Injector = Injector;
