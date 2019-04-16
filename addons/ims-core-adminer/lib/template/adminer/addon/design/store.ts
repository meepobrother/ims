import { observable, action } from 'mobx'
import util from 'ims-util'
export class AddonDesign {


    @observable
    name: string;

    @observable
    title: string;

    @observable
    version: string;

    @observable
    baseForm: any = {
        name: {
            item: {
                required: true,
                hasFeedback: false,
                help: "请输入[a-z]_[a-z0-9]",
                validateStatus: 'validating',
                label: '模块代号'
            },
            input: {
                type: 'text',
                placeholder: '请输入模块代号',
                onChange: (e) => this.name = e.target.value
            }
        },
        title: {
            item: {
                required: true,
                hasFeedback: false,
                help: "请输入3-12位汉子",
                validateStatus: 'validating',
                label: '模块名称'
            },
            input: {
                type: 'text',
                placeholder: '请输入模块名称',
                onChange: (e) => this.title = e.target.value
            }
        },
        version: {
            item: {
                required: true,
                hasFeedback: false,
                help: "请输入[0-9].[0-9].[0-9]",
                validateStatus: 'validating',
                label: '版本号'
            },
            input: {
                type: 'text',
                placeholder: '请输入版本号',
                onChange: (e) => this.version = e.target.value
            }
        }
    }

    /** 接口 */
    @observable
    incs: any[] = [];

    @observable
    showAddInc: boolean = false;

    /** 数据 */
    entities: any[] = [];

    /** 模板 */
    template: any[] = [];

    @observable
    step: number = 0;

    @observable
    nextBtn: any = {
        title: '下一步',
        props: {
            onClick: () => this.next(),
            type: 'primary'
        }
    }

    @observable
    prevBtn: any = {
        title: '上一步',
        props: {
            onClick: () => this.prev()
        }
    }

    @action
    next() {
        this.step += 1;
        if (this.step === 4) {
            this.nextBtn = {
                title: '创建模块',
                props: {
                    onClick: () => this.finish()
                }
            }
        }
    }

    @observable
    loading: boolean = false;

    @action
    finish() {
        this.loading = true;
        util.http.post('/adminer/addon/designAddon', {
            name: this.name,
            title: this.title,
            version: this.version
        }).then(res => {
            const { data } = res;
            this.loading = false;
        });
    }

    @action
    prev() {
        this.step -= 1;
        this.nextBtn = {
            title: '下一步',
            props: {
                onClick: () => this.next()
            }
        }
    }

    @action
    addInc() {
        this.showAddInc = true;
        // this.incs.push({})
    }

    @action
    openAddInc() {
        this.showAddInc = true;
    }

    @action
    closeAddInc() {
        this.showAddInc = false;
    }

}

export default new AddonDesign();

