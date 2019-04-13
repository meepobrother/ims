import React, { Component } from 'react'
import { Button, Checkbox, Form, message } from 'antd'
import { cx } from './index.scss'
export default class Index extends Component<any, any> {
    state = {
        agree: false,
        info: `
        <h2 style="text-align:center;">IMS系统最终用户许可协议</h2>
        <p class="date">2019年4月5日</p>
        <p>请务必仔细阅读和理解此IMS系统最终用户许可协议（“本《协议》”）中规定的所有权利和限制。</p>
        <p><strong>在安装本“系统”时，您需要仔细阅读并决定接受或不接受本《协议》的条款。除非或直至您接受本《协议》的全部条款，否则您不得将本“软件”安装在任何计算机上。同时您在使用本“软件”时还需同时遵守为使您有权使用本“软件”而与本公司公签订的其他协议（如有）或为证明您有权使用本“软件”而由米波网络的授权文件（如有）中的全部条款和条件。</strong></p>
        <p>本“软件”受中华人民共和国著作权法及国际著作权条约和其它知识产权法和条约的保护。本“软件”权利只许可使用，而不出售。</p>
        <h3>一．您保证</h3>
        <p> 1.不得以任何手段在本公司未经授权的情况下转售、倒卖本软件全部或部分源码。<br>
            2.未经授权不得更改本公司的版权信息。
        </p>
        <h3>二．本“系统”的著作权及其他知识产权</h3>
        <p>1.您不得去掉或以任何方式隐蔽本“软件”上的任何版权标识（或其任何部分），并应在其所有复制品上依照其现有表述方式标注其版权属于米波网络。<br>
            2.本“软件”（包括但不限于本“软件”中所含的任何图像、照片、动画、录像、录音、音乐、文字和附加程序）、随附的文档电子或印刷材料及本“软件”任何副本的著作权及其他知识产权，均米波网络拥有（属于第三方所有之商标及第三方所有之其他权利除外）。<br>
            3.本“软件”及文档电子或印刷材料享有版权，并受中华人民共和国著作权法及国际条约条款的保护。<br>
            4.您不可以从本“软件”中去掉其版权声明（或其任何部分）；并保证为本“软件”的复制品复制及载附同样的版权声明。<br>
            5.您不得以任何形式非法复制本“软件”及文档电子或印刷材料（或其任何部分）。</p>
        <h3>三．责任有限</h3>
        <p><strong>在适用法律所允许的最大范围内，本公司或其供应商绝不就因使用或不能使用本“软件”所引起的或有关的任何间接的、意外的、直接的、特殊的、惩罚性的或其它任何损害（包括但不限于财产损坏而造成的损害，因利润损失、数据损失、营业中断、计算机瘫痪或故障、商业信息的遗失而造成的损害，因未能履行包括诚信或相当注意在内的任何责任致使隐私泄露而造成的损害，因疏忽而造成的损害，或因任何金钱上的损失或任何其它损失而造成的损害,但本公司或其供应商的故意或重大过失造成您的财产损失的除外）承担赔偿责任，即使本公司或其任何供应商事先被告知该损害发生的可能性。即使补救措施未能达到预定目的，本损害赔偿排除条款将仍然有效。在适用法律所允许的最大范围内，不论何种情况，本公司及其供应商在本《协议》任何条款下所承担的全部责任，以您获得本《协议》约定之本“软件”授权而支付的合理款项（如有）为限，如您系免费获得本“软件”，则本公司及其供应商无义务承担任何责任或向您支付任何赔偿。同时，本公司对您或第三方提供的应用于或操作于本“软件”的内容或与该内容相关的其他内容而引起的任何索赔或损害不承担任何责任。</strong></p>
        <h3>四．许可终止</h3>
        <p>1.如您未遵守本《协议》的各项条款和条件，本公司可终止本《协议》。终止本《协议》时，您必须立即卸载本”软件“或销毁本“软件”的所有复制品，附随的文档电子或印刷材料，或者将其归还给本公司。&nbsp;<br>
            2.通过向您提供本“软件”的任何替换版本或修改版本或升级版本的一份取代《协议》，并规定您使用这类替换版本或修改版本或升级版本的条件是您接受这类取代《协议》，本公司可以终止本《协议》。</p>
        <h3>五.适用、管辖法律及条款效力</h3>
        <p>1.本《协议》的订立、执行和解释及争议的解决均应适用中国大陆法律。<br>
            2.如您与本公司就本《协议》内容或其执行发生任何争议，双方应进行友好协商；协商不成时，任何一方均可向本公司公住所地有管辖权的人民法院提起诉讼。<br>
            3.本《协议》的各项条款具有可分割性，如果某一条款被适用法律认定为无效，则其他条款不受影响，应继续有效并执行。
        </p>
        <p>至此，您肯定已经详细阅读并已理解本《协议》，并同意严格遵守各条款和条件。</p>
        `
    }
    render() {
        const btnProps: any = {
            onClick: () => this.next(),
            type: this.state.agree ? 'primary' : 'ghost'
        }
        return <Form className={cx({ imsInfo: true })}>
            <Form.Item className="detail">
                <div dangerouslySetInnerHTML={{
                    __html: this.state.info
                }}></div>
            </Form.Item>
            <Form.Item>
                <div className={cx({ footerBar: true })}>
                    <Checkbox onChange={e => this.setState({
                        agree: e.target.checked
                    })}>我已仔细阅读并理解此协议</Checkbox>
                    <Button {...btnProps}>下一步</Button>
                </div>
            </Form.Item>
        </Form>
    }

    next() {
        if (this.state.agree) {
            this.props.next({
                agree: this.state.agree
            })
        } else {
            message.error(`请您仔细阅读本协议，并同意本协议`);
        }
    }
}
