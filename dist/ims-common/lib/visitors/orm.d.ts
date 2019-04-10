import { NullAstVisitor, PropertyAst, ParserAstContext, ClassAst, MethodAst, ParameterAst } from 'ims-decorator';
import { ColumnAst, PrimaryColumnAst, CreateDateColumnAst, ObjectIdColumnAst, PrimaryGeneratedColumnAst, UpdateDateColumnAst, VersionColumnAst, EntityAst, EntityRepositoryAst, ChildEntityAst, TableInheritanceAst, TreeAst, TreeChildrenAst, TreeLevelColumnAst, TreeParentAst, TransactionManagerAst, TransactionRepositoryAst, TransactionAst, JoinColumnAst, JoinTableAst, ManyToManyAst, ManyToOneAst, OneToManyAst, OneToOneAst, RelationCountAst, RelationIdAst, UniqueAst, IndexAst, GeneratedAst, ExclusionAst, CheckAst, EventSubscriberAst, AfterInsertAst, AfterLoadAst, AfterRemoveAst, AfterUpdateAst, BeforeInsertAst, BeforeRemoveAst, BeforeUpdateAst, MigrationAst, TypeormAst } from 'ims-core';
export declare class OrmVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): ChildEntityAst | EntityAst | TableInheritanceAst | EventSubscriberAst | TreeAst | MigrationAst | TypeormAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): ColumnAst | CreateDateColumnAst | ObjectIdColumnAst | PrimaryGeneratedColumnAst | UpdateDateColumnAst | VersionColumnAst | PrimaryColumnAst | JoinColumnAst | JoinTableAst | ManyToManyAst | ManyToOneAst | OneToManyAst | OneToOneAst | RelationCountAst | RelationIdAst | AfterInsertAst | AfterLoadAst | AfterRemoveAst | AfterUpdateAst | BeforeInsertAst | BeforeRemoveAst | BeforeUpdateAst | TreeChildrenAst | TreeLevelColumnAst | TreeParentAst | CheckAst | EntityRepositoryAst | ExclusionAst | GeneratedAst | IndexAst | UniqueAst;
    visitMethod(ast: MethodAst, context: ParserAstContext): TransactionAst;
    visitParameter(ast: ParameterAst, context: ParserAstContext): TransactionManagerAst | TransactionRepositoryAst;
}
