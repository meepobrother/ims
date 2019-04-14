import { PropertyContext, PropertyAst } from 'ims-decorator';
import Libp2p from 'libp2p';
export interface P2pOptions {
}
export declare const P2pMetadataKey = "P2pMetadataKey";
export declare const P2p: (metadataDef?: P2pOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isP2pPrototypeAst(val: PropertyAst): val is PropertyAst<P2pOptions>;
export declare class P2pPropertyAst extends PropertyContext<P2pOptions> {
}
export interface P2pProperty extends Libp2p {
}
