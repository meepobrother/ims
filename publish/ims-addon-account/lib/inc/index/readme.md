### 文件规范
**.page.scss
    样式管理层，管理**.page.tsx中的样式主题
**.page.tsx
    试图展示层,用于**.store.ts中的数据展示
**.store.ts
    状态控制层,和**.controller.ts交互获取数据，并与**.page.tsx交互，承前启后。
**.controller.ts
    api接口输出层
**.service.ts
    业务逻辑层
typeorm
    数据层