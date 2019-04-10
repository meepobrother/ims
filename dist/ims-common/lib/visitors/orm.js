"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class OrmVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        // entity
        if (ims_core_1.isEntityClassAst(ast)) {
            return new ims_core_1.EntityAst(ast, context);
        }
        if (ims_core_1.isChildEntityClassAst(ast)) {
            return new ims_core_1.ChildEntityAst(ast, context);
        }
        if (ims_core_1.isTableInheritanceClassAst(ast)) {
            return new ims_core_1.TableInheritanceAst(ast, context);
        }
        // tree
        if (ims_core_1.isTreeClassAst(ast)) {
            return new ims_core_1.TreeAst(ast, context);
        }
        // listener
        if (ims_core_1.isEventSubscriberClassAst(ast)) {
            return new ims_core_1.EventSubscriberAst(ast, context);
        }
        if (ims_core_1.isMigrationClassAst(ast)) {
            return new ims_core_1.MigrationAst(ast, context);
        }
        if (ims_core_1.isTypeormClassAst(ast)) {
            return new ims_core_1.TypeormAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        // listener
        if (ims_core_1.isAfterInsertPropertyAst(ast)) {
            return new ims_core_1.AfterInsertAst(ast, context);
        }
        if (ims_core_1.isAfterLoadPropertyAst(ast)) {
            return new ims_core_1.AfterLoadAst(ast, context);
        }
        if (ims_core_1.isAfterRemovePropertyAst(ast)) {
            return new ims_core_1.AfterRemoveAst(ast, context);
        }
        if (ims_core_1.isAfterUpdatePropertyAst(ast)) {
            return new ims_core_1.AfterUpdateAst(ast, context);
        }
        if (ims_core_1.isBeforeInsertPropertyAst(ast)) {
            return new ims_core_1.BeforeInsertAst(ast, context);
        }
        if (ims_core_1.isBeforeRemovePropertyAst(ast)) {
            return new ims_core_1.BeforeRemoveAst(ast, context);
        }
        if (ims_core_1.isBeforeUpdatePropertyAst(ast)) {
            return new ims_core_1.BeforeUpdateAst(ast, context);
        }
        // other
        if (ims_core_1.isEntityRepositoryPropertyAst(ast)) {
            return new ims_core_1.EntityRepositoryAst(ast, context);
        }
        if (ims_core_1.isCheckPropertyAst(ast)) {
            return new ims_core_1.CheckAst(ast, context);
        }
        if (ims_core_1.isExclusionPropertyAst(ast)) {
            return new ims_core_1.ExclusionAst(ast, context);
        }
        if (ims_core_1.isGeneratedPropertyAst(ast)) {
            return new ims_core_1.GeneratedAst(ast, context);
        }
        if (ims_core_1.isIndexPropertyAst(ast)) {
            return new ims_core_1.IndexAst(ast, context);
        }
        if (ims_core_1.isUniquePropertyAst(ast)) {
            return new ims_core_1.UniqueAst(ast, context);
        }
        // column
        if (ims_core_1.isColumnPropertyAst(ast)) {
            return new ims_core_1.ColumnAst(ast, context);
        }
        if (ims_core_1.isPrimaryColumnPropertyAst(ast)) {
            return new ims_core_1.PrimaryColumnAst(ast, context);
        }
        if (ims_core_1.isCreateDateColumnPropertyAst(ast)) {
            return new ims_core_1.CreateDateColumnAst(ast, context);
        }
        if (ims_core_1.isObjectIdColumnPropertyAst(ast)) {
            return new ims_core_1.ObjectIdColumnAst(ast, context);
        }
        if (ims_core_1.isPrimaryGeneratedColumnPropertyAst(ast)) {
            return new ims_core_1.PrimaryGeneratedColumnAst(ast, context);
        }
        if (ims_core_1.isUpdateDateColumnPropertyAst(ast)) {
            return new ims_core_1.UpdateDateColumnAst(ast, context);
        }
        if (ims_core_1.isVersionColumnPropertyAst(ast)) {
            return new ims_core_1.VersionColumnAst(ast, context);
        }
        if (ims_core_1.isTreeChildrenPropertyAst(ast)) {
            return new ims_core_1.TreeChildrenAst(ast, context);
        }
        if (ims_core_1.isTreeLevelColumnPropertyAst(ast)) {
            return new ims_core_1.TreeLevelColumnAst(ast, context);
        }
        if (ims_core_1.isTreeParentPropertyAst(ast)) {
            return new ims_core_1.TreeParentAst(ast, context);
        }
        // relation
        if (ims_core_1.isJoinColumnPropertyAst(ast)) {
            return new ims_core_1.JoinColumnAst(ast, context);
        }
        if (ims_core_1.isJoinTablePropertyAst(ast)) {
            return new ims_core_1.JoinTableAst(ast, context);
        }
        if (ims_core_1.isManyToManyPropertyAst(ast)) {
            return new ims_core_1.ManyToManyAst(ast, context);
        }
        if (ims_core_1.isManyToOnePropertyAst(ast)) {
            return new ims_core_1.ManyToOneAst(ast, context);
        }
        if (ims_core_1.isOneToManyPropertyAst(ast)) {
            return new ims_core_1.OneToManyAst(ast, context);
        }
        if (ims_core_1.isOneToOnePropertyAst(ast)) {
            return new ims_core_1.OneToOneAst(ast, context);
        }
        if (ims_core_1.isRelationCountPropertyAst(ast)) {
            return new ims_core_1.RelationCountAst(ast, context);
        }
        if (ims_core_1.isRelationIdPropertyAst(ast)) {
            return new ims_core_1.RelationIdAst(ast, context);
        }
    }
    visitMethod(ast, context) {
        if (ims_core_1.isTransactionMethodAst(ast)) {
            return new ims_core_1.TransactionAst(ast, context);
        }
    }
    visitParameter(ast, context) {
        if (ims_core_1.isTransactionManagerParameterAst(ast)) {
            return new ims_core_1.TransactionManagerAst(ast, context);
        }
        if (ims_core_1.isTransactionRepositoryParameterAst(ast)) {
            return new ims_core_1.TransactionRepositoryAst(ast, context);
        }
    }
}
exports.OrmVisitor = OrmVisitor;
