import { Controller, Post, Body, visitor, AddonMetadataKey, Get, AddonAst, EntityRepository } from "ims-common";
import { ImsAddonEntity } from 'ims-adminer';
import { join, relative } from 'path';
const root = process.cwd();
@Controller({
    path: '/local',
    sourceRoot: __filename
})
export class ImsAddonsLocal {
    @EntityRepository({
        target: ImsAddonEntity
    })
    addonRepository: EntityRepository<ImsAddonEntity>;
    /**
     * 发布应用
     */
    @Get()
    publish() {
        return {
            publish: 'publish'
        }
    }

    @Get()
    async clear() {
        await this.addonRepository.clear();
        return {
            code: 'success'
        }
    }

    @Get()
    async list() {
        return await this.addonRepository.findAndCount();
    }
    /**
     * 安装应用
     */
    @Post()
    async install(@Body() body: { sourceRoot: string }) {
        const { sourceRoot } = body;
        const addon = require(join(root, sourceRoot)).default;
        const context = visitor.visitType(addon);
        const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
        const def = addonAst.ast.metadataDef;
        // 检查是否已安装
        const addonEntity = new ImsAddonEntity();
        addonEntity.logo = def.logo || '';
        addonEntity.title = def.title || '';
        addonEntity.name = def.name || '';
        addonEntity.icon = def.icon || '';
        addonEntity.entry = relative(root, def.sourceRoot || '');
        addonEntity.author = def.author || 'ims';
        addonEntity.thumbs = def.thumbs || [];
        addonEntity.desc = def.desc || '';
        addonEntity.version = def.version || '1.0';
        addonEntity.detail = def.detail || '';
        return await this.addonRepository.save(addonEntity);
    }
    /**
     * 卸载应用
     */
    @Post()
    uninstall(@Body() body: any) { }
}