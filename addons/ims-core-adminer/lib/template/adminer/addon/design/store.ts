import { observable, action } from 'mobx'
import React = require('react');

export class AddonDesign {
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
        if (this.step === 3) {
            this.nextBtn = {
                title: '完成',
                props: {
                    onClick: () => this.finish()
                }
            }
        }
    }

    @action
    finish() {
        console.log('完成')
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

}

export default new AddonDesign();

