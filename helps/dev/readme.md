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