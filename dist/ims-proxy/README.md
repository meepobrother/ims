# `ims-proxy`
> 代理插件

## 服务端
```
ims-proxy port(默认是80)
```

## 客户端
```ts
import { createClient } from 'ims-proxy'
createClient(`服务端ip地址`, '代理到本机地址端口号', '访问域名');
```

## 使用
访问域名，自动代理到本机制定端口，方便调试和给客户演示！不用部署环境及代码到服务器!

## 问题
由于是访问后去请求下载资源的，所有有时候要多刷新几次!
