import { createAddon } from 'ims-node';
import { join } from 'path';
const root = process.cwd();
createAddon(join(root, 'packages/ims-addon-install/lib'))
