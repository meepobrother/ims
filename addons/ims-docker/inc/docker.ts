import { Controller, Get } from 'ims-core';
import { exec } from 'shelljs';
@Controller({
    path: '/'
})
export class ImsDockerInc {
    @Get()
    bootstrap() {
        return exec(`docker-compose up -d`)
    }

    @Get()
    restartNginx() {
        return exec(`docker restart nginx`)
    }

    @Get()
    unameR() {
        exec('uname -r')
        exec('yum update')
        exec(`yum remove docker \
        docker-client \
        docker-client-latest \
        docker-common \
        docker-latest \
        docker-latest-logrotate \
        docker-logrotate \
        docker-engine`)
        exec(`yum install -y yum-utils \
        device-mapper-persistent-data \
        lvm2`)
        exec(`yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo`)
        exec(`yum install docker-ce docker-ce-cli containerd.io`)
        exec(`systemctl start docker`)
        const unameS = exec(`uname -s`);
        const unameM = exec(`uname -m`)
        exec(`curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-${unameS}-${unameM} -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose`)
    }
}

const unameS = exec(`uname -s`);
const unameM = exec(`uname -m`)
exec(`curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-Linux-x86_64 -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose`)