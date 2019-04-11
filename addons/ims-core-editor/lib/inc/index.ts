import { Controller, Post, Body, P2p, P2pMessage, Libp2p, EntityRepository } from 'ims-core';
import { ImsArticle } from '../typeorm';
import Cid from 'cids';
import multihashing from 'multihashing-async';
import PeerInfo from 'peer-info'
import PeerId from 'peer-id'

@Controller({
    path: '/'
})
export class ImsCoreEditorInc {
    @EntityRepository({
        target: ImsArticle
    })
    article: EntityRepository<ImsArticle>

    /**
     * p2p发布文章
     */
    @P2p()
    p2pSaveArticle(@P2p() p2p: Libp2p, @Body() msg: P2pMessage) {
        const selfId = p2p.peerInfo.id.toB58String();
        const fromPeerId = PeerId.createFromB58String(msg.from);
        // 告诉来源服务器 我已收到
        p2p.dialProtocol(new PeerInfo(fromPeerId), '/ims-core-editor/p2pHandlerSaveArticle', (err, conn) => {
            console.log({ err, conn })
        });
        if (selfId !== msg.from) {
            console.log(msg);
        } else {
            console.log('自己服务器的数据')
        }
    }
    /**
     * p2p删除文章
     */
    @P2p()
    p2pDelArticle(@Body() msg: P2pMessage) { }
    /**
     * 发布文章
     */
    @Post()
    async saveArticle(@P2p() p2p: Libp2p, @Body() body: any) {
        const buf = Buffer.from(body.content);
        return new Promise((resolve, reject) => {
            multihashing(buf, 'sha2-256', async (err, hash) => {
                if (err) reject(err);
                const cid = new Cid(1, 'dag-pb', hash);
                const article = new ImsArticle();
                article.id = cid.toString();
                article.title = body.title || '';
                article.content = buf.toString('base64');
                await this.article.save(article);
                const pubsubBuf = Buffer.from(JSON.stringify(article));
                p2p.pubsub.publish('/ims-core-editor/p2pSaveArticle', pubsubBuf, (err?: Error) => { });
                resolve(article)
            })
        })
    }

    @Post()
    delArticle(@P2p() p2p: Libp2p, @Body() body: any) {
        return new Promise((resolve, reject) => {
            p2p.pubsub.publish('/ims-core-editor/shareArticle', Buffer.from(JSON.stringify(body)), (err?: Error) => {
                if (err) reject(err)
                resolve()
            });
        });
    }
    /**
     * 保存草稿
     **/
    @Post()
    saveDrafts(@Body() body: any) { }
}
