import { InjectVisitor, MethodVisitor, HttpVisitor, AddonVisitor, OrmVisitor, CliVisitor, StoreVisitor, SocketVisitor } from './visitors';
import { Visitors } from 'ims-decorator';
export const visitor = new Visitors([
    new InjectVisitor(),
    new MethodVisitor(),
    new HttpVisitor(),
    new AddonVisitor(),
    new OrmVisitor(),
    new CliVisitor(),
    new StoreVisitor(),
    new SocketVisitor()
]);
