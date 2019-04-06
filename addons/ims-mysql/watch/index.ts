import { Watch } from 'ims-core';
import { exec } from 'shelljs'
@Watch({
    path: ['config/mysql']
})
export class ImsWatchMysql {
    run() {
        return exec(`docker restart mysql`)
    }
}
