"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const path_1 = require("path");
const bootstrapExpress_1 = require("../bootstrapExpress");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
async function bootstrap() {
    const app = require(path_1.join(process.cwd(), 'src/app')).default;
    const context = ims_common_1.visitor.visitType(app);
    // 重启typeorm
    await ims_platform_typeorm_1.typeormHandler(context);
    // 重启express
    await bootstrapExpress_1.bootstrapExpress(context);
}
bootstrap();
