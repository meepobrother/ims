import { Watch } from 'ims-core';
import { exec } from 'shelljs';
@Watch({
    path: ['config/nginx']
})
export class ImsWatchNginx {
    run() {
        return exec(`docker restart nginx`)
    }
}
