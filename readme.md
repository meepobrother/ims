<p align="center"><a href="https://meepo.com.cn" target="_blank" rel="noopener noreferrer"><img width="100" src="./assets/logo.png" alt="Ims logo"></a></p>

<h2 align="center">IMS区块链应用框架</h2>

将一系列前端及后端的技术集成使其具有更加简单、快捷及畅快的开发体验。前端```react/react-router/mobx```等。后端```express/typeorm```等，基与```typescript```装饰器实现跨平台。前台后台同构(同一结构、同一框架)开发，系统启动时```webpack```自动打包，```pm2```为系统稳定运行保驾护航。集成一个完整项目所用到的绝大部分技术形成一个企业级、可插拔、颗粒化编程的应用框架，内置应用商店!

支持在线升级和安装模块及模板，拥有良好的开发框架、成熟稳定的技术解决方案、活跃的第三方开发者及开发团队，依托IMS开放的生态系统，提供丰富的扩展功能!

成熟的联盟链应用体系，使用本框架的站点之间可以相互合作共赢!

<h2 align="center">生态系统</h2>

| 项目       | 状态                                     | 介绍  | 文档                               |
|----------|----------------------------------------|-----|----------------------------------|
| ims-core | [![ims-core-status]][ims-core-package] | 核心  | [cli docs](./packages/ims-cli)   |
| ims-util | [![ims-util-status]][ims-util-package] | 工具  | [util docs](./packages/ims-util) |
| ims-cli  | [![ims-cli-status]][ims-cli-package]   | 命令行 | [cli docs](./packages/ims-cli)   |

[ims-proxy-status]: https://img.shields.io/npm/v/ims-proxy.svg
[ims-proxy-package]: https://npmjs.com/package/ims-proxy

[ims-util-status]: https://img.shields.io/npm/v/ims-util.svg
[ims-util-package]: https://npmjs.com/package/ims-util

[ims-core-status]: https://img.shields.io/npm/v/ims-core.svg
[ims-core-package]: https://npmjs.com/package/ims-core

[ims-cli-status]: https://img.shields.io/npm/v/ims-cli.svg
[ims-cli-package]: https://npmjs.com/package/ims-cli

<h2 align="center">系统特性</h2>

* 模块化。提供模块的安装、卸载、更新、购买等基础功能，可以从应用市场轻松挑选自己需要的模块！

* 去中心化。所有服务无中心服务器依赖，确保您的数据安全!

* 全平台前端后端typescript，节省维护学习成本。

* 多个服务器间安全通信。如果在A平台中有提供卖餐服务、B平台提供送货服务，那么A平台可以和B平台签署合作，当A平台有新的订餐订单是，在B平台生成一个配送任务，假如还有一个C平台专门提供配送人员，那么B和C平台可以签署合作，自动在C平台派送送货人员。

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

## cli命令行工具
```ts
// 开发者模式
ims start -d
// 运营模式
ims start
// 浏览器打开 http://localhost:4201
// 按照指示安装

// 开发编译
ims build --name ims-core-adminer --output node_modules --watch
// 系统安装成功后，会在config目录生成一个server.json，请妥善保管。
```

## 权限篇

### 模板权限
```ts
@Template({
    admins: [{
        path: '/addUser',
        role: ['manager'],
        component: 'admin/addUser'
    }]
})
class ImsDemoTemplate{}
```
### 接口权限
```ts
// 定义权限
@Role({
    name: 'manager',
    title: '网站管理员',
    desc: '权限简介'
})
class ImsManager{

}

@Role({
    name: 'managerEditor',
    title: '网站编辑',
    desc: '网站编辑'
})
class ImsManager{

}
// 使用权限 网站管理员和网站编辑可以添加会员
@Role([ImsManager,managerEditor])
addUser(){
    // 添加会员
}
```

## 通信篇

### Protocol 服务器与服务器间通信 单聊
```ts
@Controller({
    path: '/demo'
})
class ImsDemo{
    @Protocol()
    protocol: ProtocolProperty;
    // 方法装饰器可以接受消息
    // 注册一个名称为/ims-demo/demo的1对1频道
    @Protocol()
    receiveMessage(
        @Body() msg: any, 
        @Protocol() protocol: ProtocolParameter
    ){
        console.log(`接受来自${msg.from}的消息`,msg)
        // 回复消息
        protocol('频道',`回复消息`)
        // 注册频道
        this.protocol.handle(`频道`,()=>{})
        // 发送消息
        this.protocol.send(msg.from,`频道`,`消息`)
        // 取消
        this.protocol.unhandle(`频道`)
    }
}
```

### Pubsub 服务器与服务器间通信 群发
```ts
@Controller({
    path: '/demo'
})
class ImsDemo{
    @Pubsub()
    pubsub: PubsubProperty;

    // 方法注册消息
    @Pubsub()
    listenPost(
        @Body() msg:any,
        @Pubsub() pubsub: PubsubParameter
    ){
        // 接受广播消息
        console.log(`来自${msg.from}的广播消息`,msg);
        // 处理消息后广播
        pubsub('频道',Buffer.from(`一些消息`))

        // 注册频道
        this.pubsub.subscribe(`频道`,()=>{})
        // 发布数据
        this.pubsub.publish(`频道`,`数据`)
        // 取消
        this.pubsub.unsubscribe(`频道`)
    }
}
```

### Socket 用户与服务器间通信

```ts
// 用于浏览器与服务器间通信
@Controller({
    path: '/demo'
})
class ImsDemo{

    @Socket() socket: SocketProperty;

    @Socket()
    onReceive(
        @Body() msg: any,
        @Socket() socket: SocketParameter
    ){
        console.log(`接受来自客户端的数据`,msg)
        socket(msg.from,`回复数据`)
        // 群发
        this.socket(`roomid`,`数据`)
    }
}
```

### http 客户与服务器间交互
```ts
@Controller({
    path: '/demo'
})
class ImsDemo{

    // get请求
    @Get()
    getId(@Query('id') id: string){

    }

    // post 请求
    @Post()
    post(@Body() msg: any){}

    ...其他方法
}
```

### Cookie 服务端
```ts
import {Cookie,Controller} from 'ims-core';
@Controller({
    path: '/demo'
})
class ImsDemo {
    @Post()
    post(@Cookie() cookie: Cookie){
        cookie.get(name);
        cookie.getAll()
        cookie.set(name, value);
        cookie.remove(name);
    }
}
```

### Guard 权限
```ts
@Role(verify((user) => {
    // 校验用户是否有权限
    return true;
}))
getUserList(){
    return [];
}
```

* [在线演示](https://demo.meepo.com.cn/)

* [使用文档](./helps/use/readme.md)

* [开发文档](./helps/dev/readme.md)

<h2 align="center">后续</h2>
支持在线升级和安装模块及模板，拥有良好的开发框架、成熟稳定的技术解决方案、活跃的第三方开发者及开发团队，依托IMS开放的生态系统，提供丰富的扩展功能!

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

<h2 align="center">QQ交流群</h2>

<p align="center"><a href="https://meepo.com.cn" target="_blank" rel="noopener noreferrer"><img width="200" src="./assets/IMS群二维码.png" alt="Ims logo"></a></p>
