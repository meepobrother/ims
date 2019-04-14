import Exception from 'ant-design-pro/lib/Exception';
import React = require('react');
export default function Exception403() {
    return <Exception
        type="403"
        desc={<div>抱歉，权限不足!</div>}
        backText={"换个账号登录"}
        redirect={'/login'}
    />
}
