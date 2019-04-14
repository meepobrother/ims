import { EntityRepository } from 'ims-core';
import { ImsArticle } from '../typeorm';
export declare class ImsCoreEditorInc {
    article: EntityRepository<ImsArticle>;
    p2p: any;
    /**
     * 发布文章
     */
    saveArticle(body: any): Promise<{}>;
    delArticle(body: any): Promise<{}>;
    /**
     * 保存草稿
     **/
    saveDrafts(body: any): void;
}
