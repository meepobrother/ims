import { visitor } from "ims-common";
import { join } from 'path';
import { bootstrapExpress } from '../bootstrapExpress';
import { typeormHandler } from 'packages/ims-platform-typeorm/lib/parseTypeorm';
async function bootstrap() {
    const app = require(join(process.cwd(), 'src/app')).default;
    const context = visitor.visitType(app)
    // 重启typeorm
    await typeormHandler(context);
    // 重启express
    await bootstrapExpress(context);
}
bootstrap();