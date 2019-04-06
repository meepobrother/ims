import { join } from "path";
import { visitor } from 'ims-common';
import { createAdmin } from 'ims-webpack-admin';
async function bootstrap() {
    const app = require(join(process.cwd(), 'src/app')).default;
    const context = visitor.visitType(app)
    await createAdmin(context);
}
bootstrap().then(() => {
    process.exit();
});