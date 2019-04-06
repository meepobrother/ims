import { join } from "path";
import { visitor } from 'ims-common';
import { createMobile } from 'ims-webpack-mobile';
async function bootstrap() {
    const app = require(join(process.cwd(), 'src/app')).default;
    const context = visitor.visitType(app)
    await createMobile(context);
}
bootstrap().then(() => {
    process.exit();
});