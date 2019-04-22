import { Controller, Get, EntityRepository, Post, Put } from 'ims-core';
import { ImsNotices } from '../typeorm'
/** 提醒 */
@Controller({
    path: '/notices'
})
export class NoticesController {
    /** 消息表Repository */
    @EntityRepository({
        target: ImsNotices
    })
    notices: EntityRepository<ImsNotices>;
    /** 纬度消息列表 */
    @Get()
    unReadList() {
        const uid = 1;
        // todo 查找所有发送给我的消息
        return this.notices.find({
            read: false,
            to: uid
        });
    }

    @Put()
    readNotice(noticeId: number) {
        return this.notices.update({
            id: noticeId
        }, { read: true })
    }

    @Post()
    sendNotice(opt: ImsNotices) {
        const notice = new ImsNotices()
        notice.avatar = opt.avatar || '';
        notice.link = opt.link || '';
        notice.read = false;
        notice.title = opt.title;
        notice.type = opt.type;
        notice.from = opt.from;
        notice.to = opt.to;
    }
}