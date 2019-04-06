"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const typeorm = tslib_1.__importStar(require("typeorm"));
const root = process.cwd();
async function typeormHandler(context) {
    const app = context.getClass(ims_common_1.AppMetadataKey);
    const entities = [];
    const migrations = [];
    const subscribers = [];
    function handlerTypeorm(_typeorm) {
        const typeormAst = _typeorm.getClass(ims_common_1.TypeormMetadataKey);
        typeormAst.entities.map(model => {
            model.classes.map(cls => {
                entities.push(cls.ast.target);
                if (cls instanceof ims_common_1.EntityAst) {
                    typeorm.Entity(cls.ast.metadataDef)(cls.ast.target);
                }
                else if (cls instanceof ims_common_1.ChildEntityAst) {
                    typeorm.ChildEntity(cls.ast.metadataDef)(cls.ast.target);
                }
                else if (cls instanceof ims_common_1.TableInheritanceAst) {
                    typeorm.TableInheritance(cls.ast.metadataDef)(cls.ast.target);
                }
                else if (cls instanceof ims_common_1.TreeAst) {
                    typeorm.Tree(cls.ast.metadataDef)(cls.ast.target);
                }
                else {
                    console.error(`cls`);
                }
            });
            model.propertys.map(cls => {
                if (cls instanceof ims_common_1.ColumnAst) {
                    typeorm.Column(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.AfterInsertAst) {
                    typeorm.AfterInsert()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.AfterLoadAst) {
                    typeorm.AfterLoad()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.AfterRemoveAst) {
                    typeorm.AfterRemove()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.AfterUpdateAst) {
                    typeorm.AfterUpdate()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.BeforeInsertAst) {
                    typeorm.BeforeInsert()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.BeforeRemoveAst) {
                    typeorm.BeforeRemove()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.BeforeUpdateAst) {
                    typeorm.BeforeUpdate()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.EntityRepositoryAst) {
                    typeorm.EntityRepository(cls.ast.metadataDef.target)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.CheckAst) {
                    typeorm.Check(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.ExclusionAst) {
                    typeorm.Exclusion(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.GeneratedAst) {
                    typeorm.Generated(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.IndexAst) {
                    typeorm.Index(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.UniqueAst) {
                    typeorm.Unique(cls.ast.metadataDef.name, cls.ast.metadataDef.fields)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.PrimaryColumnAst) {
                    typeorm.PrimaryColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.CreateDateColumnAst) {
                    typeorm.CreateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.ObjectIdColumnAst) {
                    typeorm.ObjectIdColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.PrimaryGeneratedColumnAst) {
                    typeorm.PrimaryGeneratedColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.UpdateDateColumnAst) {
                    typeorm.UpdateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.VersionColumnAst) {
                    typeorm.VersionColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.TreeChildrenAst) {
                    typeorm.TreeChildren(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.TreeLevelColumnAst) {
                    typeorm.TreeLevelColumn()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.TreeParentAst) {
                    typeorm.TreeParent()(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.JoinColumnAst) {
                    typeorm.JoinColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.JoinTableAst) {
                    typeorm.JoinTable(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.ManyToManyAst) {
                    typeorm.ManyToMany(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.ManyToOneAst) {
                    typeorm.ManyToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.OneToManyAst) {
                    const def = cls.ast.metadataDef;
                    typeorm.OneToMany(def.typeFunction, def.inverseSide, def.options)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.OneToOneAst) {
                    typeorm.OneToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.RelationCountAst) {
                    typeorm.RelationCount(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (cls instanceof ims_common_1.RelationIdAst) {
                    typeorm.RelationId(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey);
                }
            });
            model.methods.map(cls => {
                if (cls instanceof ims_common_1.isTransactionMethodAst) {
                    cls.parameters.map(par => {
                        if (par instanceof ims_common_1.TransactionManagerAst) {
                            typeorm.TransactionManager()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex);
                        }
                        else if (par instanceof ims_common_1.TransactionRepositoryAst) {
                            typeorm.TransactionRepository()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex);
                        }
                    });
                    typeorm.Transaction(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey, cls.ast.descriptor);
                }
            });
        });
        typeormAst.migrations.map(model => {
            migrations.push(model.target);
        });
        typeormAst.subscribers.map(cls => {
            if (cls instanceof ims_common_1.EventSubscriberAst) {
                typeorm.EventSubscriber()(cls.ast.target);
                subscribers.push(cls.ast.target);
            }
        });
    }
    app.addons.map(addon => {
        const addonAst = addon.getClass(ims_common_1.AddonMetadataKey);
        const _typeorm = addonAst.typeorm;
        if (_typeorm)
            handlerTypeorm(_typeorm);
    });
    const config = require(`${root}/config/db.json`);
    const cfg = {
        ...config,
        entities: entities,
        migrations: migrations,
        subscribers: subscribers,
    };
    const connection = await typeorm.createConnection(cfg);
    context.set('typeorm', connection);
}
exports.typeormHandler = typeormHandler;
