<p align="center"><a href="https://meepo.com.cn" target="_blank" rel="noopener noreferrer"><img width="100" src="./assets/logo.png" alt="Ims logo"></a></p>

<h2 align="center">IMS区块链应用框架</h2>

将一系列前端及后端的技术集成使其具有更加简单、快捷及畅快的开发体验。前端```react/react-router/mobx```等。后端```express/typeorm```等，基与```typescript```装饰器实现跨平台。前台后台同构(同一结构、同一框架)开发，系统启动时```webpack```自动打包，```pm2```为系统稳定运行保驾护航。集成一个完整项目所用到的绝大部分技术形成一个企业级、可插拔、颗粒化编程的应用框架，内置应用商店!

支持在线升级和安装模块及模板，拥有良好的开发框架、成熟稳定的技术解决方案、活跃的第三方开发者及开发团队，依托IMS开放的生态系统，提供丰富的扩展功能!

成熟的联盟链应用体系，使用本框架的站点之间可以相互合作共赢!

<h2 align="center">生态系统</h2>

| 项目        | 状态                                       | 介绍        | 文档                                 |
|-----------|------------------------------------------|-----------|------------------------------------|
| ims-core  | [![ims-core-status]][ims-core-package]   | 核心        | [cli docs](./packages/ims-cli)     |
| ims-util  | [![ims-util-status]][ims-util-package]   | 工具        | [util docs](./packages/ims-util)   |
| ims-cli   | [![ims-cli-status]][ims-cli-package]     | 命令行       | [cli docs](./packages/ims-cli)     |
| ims-proxy | [![ims-proxy-status]][ims-proxy-package] | 将服务器映射到本地 | [proxy docs](./packages/ims-proxy) |

[ims-proxy-status]: https://img.shields.io/npm/v/ims-proxy.svg
[ims-proxy-package]: https://npmjs.com/package/ims-proxy

[ims-util-status]: https://img.shields.io/npm/v/ims-util.svg
[ims-util-package]: https://npmjs.com/package/ims-util

[ims-core-status]: https://img.shields.io/npm/v/ims-core.svg
[ims-core-package]: https://npmjs.com/package/ims-core

[ims-cli-status]: https://img.shields.io/npm/v/ims-cli.svg
[ims-cli-package]: https://npmjs.com/package/ims-cli


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

## 启动服务
```ts
// 开发者模式
ims start -d
// 运营模式
ims start
```

## 区块链相关

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
