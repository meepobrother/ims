import { Controller, Post, Body, EntityRepository, Role, Get } from 'ims-core'
import { ImsAddonEntity } from 'ims-model';
import { verify } from 'ims-node';
import fs from 'fs-extra';
import { join } from 'path';
const root = process.cwd();
import creatIndex from './template/index'
import creatTemplateIndex from './template/template/index'
import creatIncIndex from './template/inc/index'
import creatTypeormEntitiesIndex from './template/typeorm/entities/index'
import creatTypeormIndex from './template/typeorm/index'

@Controller({
    path: '/adminer/addon'
})
export class ImsCoreAdminerSetting {

    @EntityRepository({
        db: 'system',
        target: ImsAddonEntity
    })
    addon: EntityRepository<ImsAddonEntity>;

    @Post()
    @Role(['admin'])
    async designAddon(@Body() body: any) {
        const { name, title, version, author } = body;
        const path = join(root, 'addons', name);
        if (fs.existsSync(path)) {
            return {
                code: -1,
                message: '模块已存在'
            }
        } else {
            // 检查模块是否已存在
            let addon = await this.addon.findOne({
                name: name
            });
            if (!addon) {
                addon = new ImsAddonEntity();
            }
            /** 创建模块 */
            fs.ensureDirSync(path);
            fs.ensureDirSync(join(path, 'template'))
            fs.ensureDirSync(join(path, 'inc'))
            fs.ensureDirSync(join(path, 'typeorm'))
            fs.ensureDirSync(join(path, 'typeorm', 'entities'))
            fs.ensureDirSync(join(path, 'typeorm', 'migrations'))
            fs.ensureDirSync(join(path, 'typeorm', 'subscribers'))

            fs.writeFileSync(join(path, 'index.ts'), creatIndex(name, title, version));
            fs.writeFileSync(join(path, 'template', 'index.ts'), creatTemplateIndex(name));
            fs.writeFileSync(join(path, 'inc', 'index.ts'), creatIncIndex(name));
            fs.writeFileSync(join(path, 'typeorm/entities', 'index.ts'), creatTypeormEntitiesIndex(name));
            fs.writeFileSync(join(path, 'typeorm', 'index.ts'), creatTypeormIndex(name));

            /** 模块入库 */
            addon.name = name;
            addon.title = title;
            addon.version = version;
            addon.isLocal = true;
            addon.enable = false;
            addon.entry = join(path, 'index.ts');
            addon.author = author;

            await this.addon.save(addon);
            return {
                id: addon.id,
                message: '模块创建成功'
            }
        }
    }

    @Get()
    mineAddons() {
        return this.addon.findAndCount({})
    }
}