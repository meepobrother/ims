import { NullAstVisitor, PropertyAst, ParserAstContext, ClassAst, MethodAst, ParameterAst } from 'ims-decorator';
import {
    isColumnPropertyAst, ColumnAst, isPrimaryColumnPropertyAst,
    PrimaryColumnAst, isCreateDateColumnPropertyAst,
    CreateDateColumnAst, isObjectIdColumnPropertyAst,
    ObjectIdColumnAst, isPrimaryGeneratedColumnPropertyAst,
    PrimaryGeneratedColumnAst, isUpdateDateColumnPropertyAst,
    UpdateDateColumnAst, isVersionColumnPropertyAst,
    VersionColumnAst, isEntityClassAst, EntityAst,
    isEntityRepositoryPropertyAst, EntityRepositoryAst,
    isChildEntityClassAst, ChildEntityAst,
    isTableInheritanceClassAst, TableInheritanceAst, isTreeClassAst,
    TreeAst, isTreeChildrenPropertyAst, TreeChildrenAst, isTreeLevelColumnPropertyAst,
    TreeLevelColumnAst, isTreeParentPropertyAst, TreeParentAst,
    isTransactionManagerParameterAst, isTransactionRepositoryParameterAst,
    TransactionManagerAst, TransactionRepositoryAst, isTransactionMethodAst,
    TransactionAst,
    isJoinColumnPropertyAst,
    isJoinTablePropertyAst,
    isManyToManyPropertyAst,
    isManyToOnePropertyAst,
    isOneToManyPropertyAst,
    isOneToOnePropertyAst,
    isRelationCountPropertyAst,
    isRelationIdPropertyAst,
    JoinColumnAst,
    JoinTableAst,
    ManyToManyAst,
    ManyToOneAst,
    OneToManyAst,
    OneToOneAst,
    RelationCountAst,
    RelationIdAst,
    isCheckPropertyAst,
    isExclusionPropertyAst,
    isGeneratedPropertyAst,
    isIndexPropertyAst,
    isUniquePropertyAst,
    UniqueAst,
    IndexAst,
    GeneratedAst,
    ExclusionAst,
    CheckAst,
    isEventSubscriberClassAst,
    EventSubscriberAst,
    isAfterInsertPropertyAst,
    isAfterLoadPropertyAst,
    isAfterRemovePropertyAst,
    isAfterUpdatePropertyAst,
    isBeforeInsertPropertyAst,
    isBeforeRemovePropertyAst,
    isBeforeUpdatePropertyAst,
    AfterInsertAst,
    AfterLoadAst,
    AfterRemoveAst,
    AfterUpdateAst,
    BeforeInsertAst,
    BeforeRemoveAst,
    BeforeUpdateAst,
    isMigrationClassAst,
    MigrationAst,
    isTypeormClassAst,
    TypeormAst
} from 'ims-core';

export class OrmVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        // entity
        if (isEntityClassAst(ast)) {
            return new EntityAst(ast, context)
        }
        if (isChildEntityClassAst(ast)) {
            return new ChildEntityAst(ast, context)
        }
        if (isTableInheritanceClassAst(ast)) {
            return new TableInheritanceAst(ast, context)
        }
        // tree
        if (isTreeClassAst(ast)) {
            return new TreeAst(ast, context)
        }
        // listener
        if (isEventSubscriberClassAst(ast)) {
            return new EventSubscriberAst(ast, context)
        }
        if (isMigrationClassAst(ast)) {
            return new MigrationAst(ast, context)
        }
        if (isTypeormClassAst(ast)) {
            return new TypeormAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        // listener
        if (isAfterInsertPropertyAst(ast)) {
            return new AfterInsertAst(ast, context)
        }
        if (isAfterLoadPropertyAst(ast)) {
            return new AfterLoadAst(ast, context)
        }
        if (isAfterRemovePropertyAst(ast)) {
            return new AfterRemoveAst(ast, context)
        }
        if (isAfterUpdatePropertyAst(ast)) {
            return new AfterUpdateAst(ast, context)
        }
        if (isBeforeInsertPropertyAst(ast)) {
            return new BeforeInsertAst(ast, context)
        }
        if (isBeforeRemovePropertyAst(ast)) {
            return new BeforeRemoveAst(ast, context)
        }
        if (isBeforeUpdatePropertyAst(ast)) {
            return new BeforeUpdateAst(ast, context)
        }
        // other
        if (isEntityRepositoryPropertyAst(ast)) {
            return new EntityRepositoryAst(ast, context)
        }
        if (isCheckPropertyAst(ast)) {
            return new CheckAst(ast, context)
        }
        if (isExclusionPropertyAst(ast)) {
            return new ExclusionAst(ast, context)
        }
        if (isGeneratedPropertyAst(ast)) {
            return new GeneratedAst(ast, context)
        }
        if (isIndexPropertyAst(ast)) {
            return new IndexAst(ast, context)
        }
        if (isUniquePropertyAst(ast)) {
            return new UniqueAst(ast, context)
        }
        // column
        if (isColumnPropertyAst(ast)) {
            return new ColumnAst(ast, context)
        }
        if (isPrimaryColumnPropertyAst(ast)) {
            return new PrimaryColumnAst(ast, context)
        }
        if (isCreateDateColumnPropertyAst(ast)) {
            return new CreateDateColumnAst(ast, context)
        }
        if (isObjectIdColumnPropertyAst(ast)) {
            return new ObjectIdColumnAst(ast, context)
        }
        if (isPrimaryGeneratedColumnPropertyAst(ast)) {
            return new PrimaryGeneratedColumnAst(ast, context)
        }
        if (isUpdateDateColumnPropertyAst(ast)) {
            return new UpdateDateColumnAst(ast, context)
        }
        if (isVersionColumnPropertyAst(ast)) {
            return new VersionColumnAst(ast, context)
        }
        if (isTreeChildrenPropertyAst(ast)) {
            return new TreeChildrenAst(ast, context)
        }
        if (isTreeLevelColumnPropertyAst(ast)) {
            return new TreeLevelColumnAst(ast, context)
        }
        if (isTreeParentPropertyAst(ast)) {
            return new TreeParentAst(ast, context)
        }
        // relation
        if (isJoinColumnPropertyAst(ast)) {
            return new JoinColumnAst(ast, context)
        }
        if (isJoinTablePropertyAst(ast)) {
            return new JoinTableAst(ast, context)
        }
        if (isManyToManyPropertyAst(ast)) {
            return new ManyToManyAst(ast, context)
        }
        if (isManyToOnePropertyAst(ast)) {
            return new ManyToOneAst(ast, context)
        }
        if (isOneToManyPropertyAst(ast)) {
            return new OneToManyAst(ast, context)
        }
        if (isOneToOnePropertyAst(ast)) {
            return new OneToOneAst(ast, context)
        }
        if (isRelationCountPropertyAst(ast)) {
            return new RelationCountAst(ast, context)
        }
        if (isRelationIdPropertyAst(ast)) {
            return new RelationIdAst(ast, context)
        }
    }

    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isTransactionMethodAst(ast)) {
            return new TransactionAst(ast, context)
        }
    }

    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (isTransactionManagerParameterAst(ast)) {
            return new TransactionManagerAst(ast, context)
        }
        if (isTransactionRepositoryParameterAst(ast)) {
            return new TransactionRepositoryAst(ast, context)
        }
    }
}
