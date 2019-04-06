<p align="center"><a href="https://meepo.com.cn" target="_blank" rel="noopener noreferrer"><img width="100" src="./assets/logo.png" alt="Ims logo"></a></p>

<h2 align="center">IMS应用框架</h2>

将一系列前端及后端的技术集成使其具有更加简单、快捷及畅快的开发体验。前端```react/react-router/mobx```等。后端```express/typeorm```等，基与```typescript```装饰器实现跨平台。前台后台同构(同一结构、同一框架)开发，系统启动时```webpack```自动打包，```pm2```为系统稳定运行保驾护航。集成一个完整项目所用到的绝大部分技术形成一个企业级、可插拔、颗粒化变成的应用框架，内置应用商店!

支持在线升级和安装模块及模板，拥有良好的开发框架、成熟稳定的技术解决方案、活跃的第三方开发者及开发团队，依托IMS开放的生态系统，提供丰富的扩展功能!

成熟的联盟链应用体系，使用本框架的站点之间可以相互合作共赢!

<h2 align="center">生态系统</h2>

| 项目        | 状态                                       | 介绍   |
|-----------|------------------------------------------|------|
| ims-core  | [![ims-core-status]][ims-core-package]   | 核心   |
| ims-util  | [![ims-util-status]][ims-util-package]   | 工具   |
| ims-cli   | [![ims-cli-status]][ims-cli-package]     | 命令行  |
| ims-proxy | [![ims-proxy-status]][ims-proxy-package] | 将服务器映射到本地 |

[ims-proxy-status]: https://img.shields.io/npm/v/ims-proxy.svg
[ims-proxy-package]: https://npmjs.com/package/ims-proxy

[ims-util-status]: https://img.shields.io/npm/v/ims-util.svg
[ims-util-package]: https://npmjs.com/package/ims-util

[ims-core-status]: https://img.shields.io/npm/v/ims-core.svg
[ims-core-package]: https://npmjs.com/package/ims-core

[ims-cli-status]: https://img.shields.io/npm/v/ims-cli.svg
[ims-cli-package]: https://npmjs.com/package/ims-cli

<h2 align="center">安装部署</h2>

### 线上运营部署
```ts
// nodejs mysql memcached nginx 自行安装
npm install -g ims-cli
cli start 8080

// nginx配置及分布式
upstream default_upstream {
    ip_hash;
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
    server 127.0.0.1:8083;
    ...
}

server {
    listen       80;
    server_name  localhost;
    location / {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_pass http://default_upstream;
    }
}
```

### 本地安装部署
```ts
npm install -g ims-cli
ims init .
ims start 8080
// 浏览器打开
http://localhost:8080
```

### 远程开发调试
```ts
// 服务端
ims proxy
// 客户端
import { createClient } from 'ims-proxy'
createClient('服务端ip', '本地端口', '绑定域名');
```

<h2 align="center">目录结构</h2>

### 系统目录结构
* `addons` 应用目录
* `attachment` 附近目录
* `config` 配置目录
* `data` 数据目录
* `template` 模板目录

### 应用目录结构
* `inc` api接口
* `typeorm` 数据库
* `template` 模板源码
* `index.ts` 入口


<h2 align="center">文档及社区</h2>

* [在线演示](https://demo.meepo.com.cn/)

* [使用文档](https://doc.meepo.com.cn/)

* [开发文档](https://dev.meepo.com.cn/)

* [开发运营社区](https://bbs.meepo.com.cn/)

<h2 align="center">后续</h2>

再次感谢您对我们的支持，欢迎您对我们的系统提出意见，我们期待您的Pull Request。

<h2 align="center">相关连接</h2>

* [taro](https://github.com/NervJS/taro)
* [react](https://github.com/facebook/react)
* [react-router](https://github.com/ReactTraining/react-router)
* [mobx](https://github.com/mobxjs/mobx)
* [express](https://github.com/expressjs/express)
* [nestjs](https://github.com/nestjs/nest)
* [typeorm](https://github.com/typeorm/typeorm)
* [typescript](https://github.com/Microsoft/TypeScript)
* [webpack](https://github.com/webpack/webpack)
* [pm2](https://github.com/Unitech/pm2) 

