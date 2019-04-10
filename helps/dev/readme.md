# 开发文档

## 装饰器及作用


### Addon 定义插件
```ts
import { Addon } from 'ims-core';
// Addon定义插件
@Addon()
export default class ImsDemo{}
```
#### Controller 定义Api借口
```ts
import { Controller, Get, Post } from 'ims-core';
@Controller({
    path: '/'
})
export class ImsDemoUser{

    @Get()
    getName(){
        const name = 'ims';
        return {
            data: name
        }
    }

    @Post()
    updateName(@Body('name') name: string){
        
    }
}
```
#### On Websocket监听
```ts
import { On } from 'ims-core';
@Controller({
    path: '/socket'
})
export class ImsDemoSocket{
    @On('message')
    onMessage(@Body() msg: any){

    }
}
```

#### P2p区块链消息处理

```ts
import { P2p,Message,P2plib } from 'ims-core';
@Controller({
    path: '/socket'
})
export class ImsDemoSocket{
    @P2p()
    onMessage(@Body() msg: Message){
        // 接受消息
    }

    // 发送消息
    @Post()
    sendMessage(@P2p() p2p: P2plib){
        p2p.pubsub.publish('/socket/onMessage',Buffer.from('hello'),()=>{
            
        })
    }
}
```