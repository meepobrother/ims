import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export const InjectMetadataKey = 'InjectMetadataKey';
export type Inject = any;
export const Inject = makeDecorator<Inject>(InjectMetadataKey);
export function isInjectPropertyAst(val: PropertyAst): val is PropertyAst<Inject> {
    return val.metadataKey === InjectMetadataKey;
}
export class InjectAst extends PropertyContext<Inject> {
    inject() {
        return this.context.inject(this.ast.metadataDef || this.ast.propertyType)
    }
}
