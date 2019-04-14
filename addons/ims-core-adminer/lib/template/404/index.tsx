import Exception from 'ant-design-pro/lib/Exception';
import React = require('react');
export default function Exception403() {
    return <Exception
        type="404"
        desc={<div>抱歉，你访问的页面不存在!</div>}
        backText={"返回"}
    />
}
