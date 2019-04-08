
## Gentos 环境配置
```sh
# docker安装
yum update
yum remove docker \
        docker-client \
        docker-client-latest \
        docker-common \
        docker-latest \
        docker-latest-logrotate \
        docker-logrotate \
        docker-engine
yum install -y yum-utils \
        device-mapper-persistent-data \
        lvm2
yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io
systemctl start docker
# docker-compose 安装
curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# nodejs 安装
curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash
source ~/.bash_profile
nvm list-remote
nvm install `version`
nvm list
nvm use `version`
nvm alias default `version`
```

# 前端框架
antd

# mplex
流多路复用协议

# docker 自动部署

# 自动构建

# pm2
主进层pm2

# 模块插件目录结构规范
- inc api借口目录
  - index.ts
- template 模板目录
  - admin 后台模板
  - mobile 前台模板
  - index.ts
- typeorm 存放数据库相关
  - entities 数据库entity
  - migrations 迁移升级
  - subscribers 事件监听
  - index.ts 
- index.ts 模块入口

# 资源共享

平台和平台之间可互相通信、互相交易

# 以来环境

# 快速开始

# 文档

# 进阶

typeorm
nextjs
react


# 微服务

用户微服务