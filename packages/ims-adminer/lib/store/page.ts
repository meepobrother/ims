import { observable, action } from 'mobx'
export class ImsPage {
    @observable
    title: string;

    @observable
    props: any;

    @action
    setTitle(title: string) {
        this.title = title;
    }

    @action
    setProps(props: any) {
        this.props = props;
    }
}
