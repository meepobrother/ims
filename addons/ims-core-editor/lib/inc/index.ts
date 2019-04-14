import { Controller, Post, Body, P2p, EntityRepository } from 'ims-core';
import { ImsArticle } from '../typeorm';
import Cid from 'cids';
import multihashing from 'multihashing-async';

@Controller({
    path: '/'
})
export class ImsCoreEditorInc {
    @EntityRepository({
        target: ImsArticle
    })
    article: EntityRepository<ImsArticle>

    @P2p() p2p: any;
    /**
     * 发布文章
     */
    @Post()
    async saveArticle(@Body() body: any) {
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
                this.p2p.pubsub.publish('/ims-core-editor/p2pSaveArticle', pubsubBuf, (err?: Error) => { });
                resolve(article)
            })
        })
    }

    @Post()
    delArticle(@Body() body: any) {
        return new Promise((resolve, reject) => {
            this.p2p.pubsub.publish('/ims-core-editor/shareArticle', Buffer.from(JSON.stringify(body)), (err?: Error) => {
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
