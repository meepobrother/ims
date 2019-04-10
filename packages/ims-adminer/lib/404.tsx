import Exception from 'ant-design-pro/lib/Exception';
import { Button as AntButton } from 'antd'
import React from 'react';
const Button: any = AntButton;
export function Exception404() {
    return <Exception
        type="404"
        desc={<div><Button type="dashed">抱歉，你访问的页面不存在</Button></div>}
        backText={"返回"}
    />
}
