import { observable, action } from 'mobx'
import util from 'ims-util'
export default class ImsCoreEditor {
    @observable
    title: string;

    @observable
    content: string;

    @action
    setTitle(title: string) {
        this.title = title;
    }

    @action
    setContent(content: string) {
        this.content = content;
    }

    publish() {
        return util.http.post('/ims-core-editor/saveArticle',{
            title: this.title,
            content: this.content
        });
    }
}