"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const typeorm = __importStar(require("typeorm"));
function parseTypeorm(context) {
    const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
    const typeormAst = addonAst.getTypeormAst();
    const entities = [];
    typeormAst.entities.map(model => {
        entities.push(model.target);
        model.classes.map(cls => {
            if (cls instanceof ims_core_1.EntityAst) {
                typeorm.Entity(cls.ast.metadataDef)(cls.ast.target);
            }
            else if (cls instanceof ims_core_1.ChildEntityAst) {
                typeorm.ChildEntity(cls.ast.metadataDef)(cls.ast.target);
            }
            else if (cls instanceof ims_core_1.TableInheritanceAst) {
                typeorm.TableInheritance(cls.ast.metadataDef)(cls.ast.target);
            }
            else if (cls instanceof ims_core_1.TreeAst) {
                typeorm.Tree(cls.ast.metadataDef)(cls.ast.target);
            }
            else {
                console.error(`cls`);
            }
        });
        model.propertys.map(cls => {
            if (cls instanceof ims_core_1.ColumnAst) {
                typeorm.Column(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.AfterInsertAst) {
                typeorm.AfterInsert()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.AfterLoadAst) {
                typeorm.AfterLoad()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.AfterRemoveAst) {
                typeorm.AfterRemove()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.AfterUpdateAst) {
                typeorm.AfterUpdate()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.BeforeInsertAst) {
                typeorm.BeforeInsert()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.BeforeRemoveAst) {
                typeorm.BeforeRemove()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.BeforeUpdateAst) {
                typeorm.BeforeUpdate()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.EntityRepositoryAst) {
                typeorm.EntityRepository(cls.ast.metadataDef.target)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.CheckAst) {
                typeorm.Check(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.ExclusionAst) {
                typeorm.Exclusion(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.GeneratedAst) {
                typeorm.Generated(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.IndexAst) {
                typeorm.Index(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.UniqueAst) {
                typeorm.Unique(cls.ast.metadataDef.name, cls.ast.metadataDef.fields)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.PrimaryColumnAst) {
                typeorm.PrimaryColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.CreateDateColumnAst) {
                typeorm.CreateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.ObjectIdColumnAst) {
                typeorm.ObjectIdColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.PrimaryGeneratedColumnAst) {
                typeorm.PrimaryGeneratedColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.UpdateDateColumnAst) {
                typeorm.UpdateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.VersionColumnAst) {
                typeorm.VersionColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.TreeChildrenAst) {
                typeorm.TreeChildren(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.TreeLevelColumnAst) {
                typeorm.TreeLevelColumn()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.TreeParentAst) {
                typeorm.TreeParent()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.JoinColumnAst) {
                typeorm.JoinColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.JoinTableAst) {
                typeorm.JoinTable(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.ManyToManyAst) {
                typeorm.ManyToMany(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.ManyToOneAst) {
                typeorm.ManyToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.OneToManyAst) {
                const def = cls.ast.metadataDef;
                typeorm.OneToMany(def.typeFunction, def.inverseSide, def.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.OneToOneAst) {
                typeorm.OneToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.RelationCountAst) {
                typeorm.RelationCount(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof ims_core_1.RelationIdAst) {
                typeorm.RelationId(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey);
            }
        });
        model.methods.map(cls => {
            if (cls instanceof ims_core_1.isTransactionMethodAst) {
                cls.parameters.map(par => {
                    if (par instanceof ims_core_1.TransactionManagerAst) {
                        typeorm.TransactionManager()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex);
                    }
                    else if (par instanceof ims_core_1.TransactionRepositoryAst) {
                        typeorm.TransactionRepository()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex);
                    }
                });
                typeorm.Transaction(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey, cls.ast.descriptor);
            }
        });
    });
    const migrations = [];
    typeormAst.migrations.map(model => {
        migrations.push(model.target);
    });
    const subscribers = [];
    typeormAst.subscribers.map(model => {
        subscribers.push(model.target);
        typeorm.EventSubscriber()(model.target);
    });
    return {
        entities,
        migrations,
        subscribers
    };
}
exports.parseTypeorm = parseTypeorm;
