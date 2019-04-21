import Exception from 'ant-design-pro/lib/Exception';
import React = require('react');
export default function Exception403() {
    return <Exception
        type="500"
        desc={<div>服务器错误!</div>}
        backText={"返回"}
    />
}
