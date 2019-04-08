import { ParserAstContext, ClassAst, ClassContext } from 'ims-decorator';
export declare const MigrationMetadataKey = "MigrationMetadataKey";
export interface MigrationOptions {
}
export declare const Migration: (metadataDef?: MigrationOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isMigrationClassAst(val: ClassAst): val is ClassAst<MigrationOptions>;
export declare class MigrationAst extends ClassContext<MigrationOptions> {
    constructor(ast: ClassAst, context: ParserAstContext);
}
import { MigrationInterface } from "typeorm";
export declare type Migration = MigrationInterface;
