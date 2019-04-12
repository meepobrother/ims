import { Component } from 'react';
import React = require('react');

import TagSelect from 'ant-design-pro/lib/TagSelect'
import { Tag, Card, Carousel, Row, Col } from 'antd';
// 应用商城
import "./index.less"
export default class Index extends Component {
    render() {
        return <div className="ims-ucenter-addons">
            <Carousel className="ims-ucenter-addons-carousel" vertical={true} touchMove={true}>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
            </Carousel>
            <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>

                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
                <Card.Grid style={{ width: '20%', textAlign: 'center' }}></Card.Grid>
            </Card>
            <TagSelect hideCheckAll={true} className="" Option={{}}>
                <TagSelect.Option value="all">全部应用</TagSelect.Option>
                <TagSelect.Option value="all">吸粉</TagSelect.Option>
                <TagSelect.Option value="all">营销</TagSelect.Option>
                <TagSelect.Option value="all">游戏</TagSelect.Option>
                <TagSelect.Option value="all">商城</TagSelect.Option>
                <TagSelect.Option value="all">直播</TagSelect.Option>
                <TagSelect.Option value="all">现场</TagSelect.Option>
                <TagSelect.Option value="all">同城</TagSelect.Option>
                <TagSelect.Option value="all">婚庆</TagSelect.Option>
                <TagSelect.Option value="all">餐饮</TagSelect.Option>
                <TagSelect.Option value="all">社区</TagSelect.Option>
                <TagSelect.Option value="all">教育</TagSelect.Option>
                <TagSelect.Option value="all">工具</TagSelect.Option>
                <TagSelect.Option value="all">收款</TagSelect.Option>
                <TagSelect.Option value="all">汽修</TagSelect.Option>
                <TagSelect.Option value="all">管理</TagSelect.Option>
                <TagSelect.Option value="all">红包</TagSelect.Option>
                <TagSelect.Option value="all">政务</TagSelect.Option>
                <TagSelect.Option value="all">办公</TagSelect.Option>
                <TagSelect.Option value="all">官网</TagSelect.Option>
                <TagSelect.Option value="all">招聘</TagSelect.Option>
                <TagSelect.Option value="all">连锁</TagSelect.Option>
                <TagSelect.Option value="all">会员卡</TagSelect.Option>
            </TagSelect>
            <TagSelect hideCheckAll={true} className="" Option={{}}>
                <TagSelect.Option value="all">全部</TagSelect.Option>
                <TagSelect.Option value="all">畅销</TagSelect.Option>
                <TagSelect.Option value="all">推荐</TagSelect.Option>
                <TagSelect.Option value="all">游戏</TagSelect.Option>
                <TagSelect.Option value="all">商城</TagSelect.Option>
                <TagSelect.Option value="all">直播</TagSelect.Option>
            </TagSelect>
            <Row>
                <Col span={'6'}>
                    <Card>
                        <Card.Meta title="微商城"></Card.Meta>
                    </Card>
                </Col>
                <Col span={'6'}>
                    <Card>
                        <Card.Meta title="微商城"></Card.Meta>
                    </Card>
                </Col>
                <Col span={'6'}>
                    <Card>
                        <Card.Meta title="微商城"></Card.Meta>
                    </Card>
                </Col>
                <Col span={'6'}>
                    <Card>
                        <Card.Meta title="微商城"></Card.Meta>
                    </Card>
                </Col>
            </Row>
            <Tag style={{ display: 'none' }} />
        </div>
    }
}