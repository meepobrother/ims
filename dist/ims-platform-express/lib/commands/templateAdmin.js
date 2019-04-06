"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ims_common_1 = require("ims-common");
const ims_webpack_admin_1 = require("ims-webpack-admin");
async function bootstrap() {
    const app = require(path_1.join(process.cwd(), 'src/app')).default;
    const context = ims_common_1.visitor.visitType(app);
    await ims_webpack_admin_1.createAdmin(context);
}
bootstrap().then(() => {
    process.exit();
});
