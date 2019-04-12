import {
    EntityAst, ChildEntityAst, TableInheritanceAst, TreeAst,
    ColumnAst, AfterInsertAst, AfterLoadAst, AfterRemoveAst,
    AfterUpdateAst, BeforeInsertAst, BeforeRemoveAst,
    BeforeUpdateAst, EntityRepositoryAst, CheckAst,
    ExclusionAst, GeneratedAst, IndexAst, UniqueAst,
    PrimaryColumnAst, CreateDateColumnAst, ObjectIdColumnAst,
    PrimaryGeneratedColumnAst, UpdateDateColumnAst,
    VersionColumnAst, TreeChildrenAst, TreeLevelColumnAst,
    TreeParentAst, JoinColumnAst, JoinTableAst,
    ManyToManyAst, ManyToOneAst, OneToManyAst,
    OneToOneAst, RelationCountAst, RelationIdAst,
    isTransactionMethodAst, TransactionManagerAst,
    TransactionRepositoryAst, AddonMetadataKey, AddonAst,
} from 'ims-core';
import { TypeContext, } from 'ims-decorator'
import * as typeorm from 'typeorm';
export function parseTypeorm(context: TypeContext) {
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    const typeormAst = addonAst.getTypeormAst();
    const entities = [];
    typeormAst.entities.map(model => {
        model.classes.map(cls => {
            if (cls instanceof EntityAst) {
                typeorm.Entity(cls.ast.metadataDef as any)(cls.ast.target)
            } else if (cls instanceof ChildEntityAst) {
                typeorm.ChildEntity(cls.ast.metadataDef as any)(cls.ast.target)
            } else if (cls instanceof TableInheritanceAst) {
                typeorm.TableInheritance(cls.ast.metadataDef as any)(cls.ast.target)
            } else if (cls instanceof TreeAst) {
                typeorm.Tree(cls.ast.metadataDef)(cls.ast.target)
            } else {
                console.error(`cls`)
            }
            console.log(`entity ${cls.ast.target.name}`)
            entities.push(cls.ast.target);
        });
        model.propertys.map(cls => {
            if (cls instanceof ColumnAst) {
                typeorm.Column(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey)
            } else if (cls instanceof AfterInsertAst) {
                typeorm.AfterInsert()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof AfterLoadAst) {
                typeorm.AfterLoad()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof AfterRemoveAst) {
                typeorm.AfterRemove()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof AfterUpdateAst) {
                typeorm.AfterUpdate()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof BeforeInsertAst) {
                typeorm.BeforeInsert()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof BeforeRemoveAst) {
                typeorm.BeforeRemove()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof BeforeUpdateAst) {
                typeorm.BeforeUpdate()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof EntityRepositoryAst) {
                typeorm.EntityRepository(cls.ast.metadataDef.target)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof CheckAst) {
                typeorm.Check(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof ExclusionAst) {
                typeorm.Exclusion(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof GeneratedAst) {
                typeorm.Generated(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof IndexAst) {
                typeorm.Index(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof UniqueAst) {
                typeorm.Unique(cls.ast.metadataDef.name, cls.ast.metadataDef.fields)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof PrimaryColumnAst) {
                typeorm.PrimaryColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof CreateDateColumnAst) {
                typeorm.CreateDateColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof ObjectIdColumnAst) {
                typeorm.ObjectIdColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof PrimaryGeneratedColumnAst) {
                typeorm.PrimaryGeneratedColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof UpdateDateColumnAst) {
                typeorm.UpdateDateColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof VersionColumnAst) {
                typeorm.VersionColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof TreeChildrenAst) {
                typeorm.TreeChildren(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof TreeLevelColumnAst) {
                typeorm.TreeLevelColumn()(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof TreeParentAst) {
                typeorm.TreeParent()(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof JoinColumnAst) {
                typeorm.JoinColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof JoinTableAst) {
                typeorm.JoinTable(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof ManyToManyAst) {
                typeorm.ManyToMany(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof ManyToOneAst) {
                typeorm.ManyToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof OneToManyAst) {
                const def = cls.ast.metadataDef;
                typeorm.OneToMany(def.typeFunction, def.inverseSide, def.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof OneToOneAst) {
                typeorm.OneToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof RelationCountAst) {
                typeorm.RelationCount(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof RelationIdAst) {
                typeorm.RelationId(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey as string)
            }
        });
        model.methods.map(cls => {
            if (cls instanceof isTransactionMethodAst) {
                cls.parameters.map(par => {
                    if (par instanceof TransactionManagerAst) {
                        typeorm.TransactionManager()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex)
                    }
                    else if (par instanceof TransactionRepositoryAst) {
                        typeorm.TransactionRepository()(par.ast.target, par.ast.propertyKey as string, par.ast.parameterIndex)
                    }
                });
                typeorm.Transaction(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string, cls.ast.descriptor)
            }
        });
    });
    const migrations = [];
    typeormAst.migrations.map(model => {
        migrations.push(model.target)
    });
    const subscribers = [];
    typeormAst.subscribers.map(model => {
        subscribers.push(model.target);
        typeorm.EventSubscriber()(model.target)
    })
    return {
        entities,
        migrations,
        subscribers
    };
}