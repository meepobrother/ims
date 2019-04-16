import React = require('react');
import { Button, Card, Drawer, Icon, List } from 'antd'
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import "./index.less";
import { inject, observer } from 'mobx-react'
import { AddonDesign } from '../store'
const addBtnProps: any = {
    type: "dashed",
    className: "add-inc"
}
@inject('design')
@observer
export default class Index extends React.Component<{ design?: AddonDesign }, any> {
    render() {
        const { design } = this.props;
        const dataSource = ['', ...design.incs];
        console.log({ design })
        return <div>
            <List
                className="ims-addon-design-incs"
                grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                dataSource={dataSource}
                renderItem={(item: any) => {
                    if (item) {
                        return <List.Item>
                            <Card hoverable actions={[<a>编辑</a>, <a>删除</a>]}>
                                <Card.Meta title={item.title} description={<Ellipsis>{item.description}</Ellipsis>}></Card.Meta>
                            </Card>
                        </List.Item>
                    } else {
                        return <List.Item>
                            <Button {...addBtnProps} onClick={() => { design.openAddInc() }}>
                                <Icon type="plus" /> 新建接口
                        </Button>
                        </List.Item>
                    }
                }}></List>
            <Drawer visible={design.showAddInc} onClose={() => design.closeAddInc()} title="添加接口" placement="right" closable={true}></Drawer>
        </div>
    }
}
