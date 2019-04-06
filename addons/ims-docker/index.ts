import { Addon } from 'ims-core';
import { exec } from 'shelljs'
@Addon({})
export class ImsDocker {
    constructor() {
        exec(`docker network create app`)
        exec(`docker-compose up -d`)
    }
}
