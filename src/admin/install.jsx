"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const install_scss_1 = require("./install.scss");
const ims_util_1 = __importDefault(require("ims-util"));
const antd_1 = require("antd");
const React = require("react");
const bind_1 = __importDefault(require("./bind"));
const finish_1 = __importDefault(require("./finish"));
const setting_1 = __importDefault(require("./setting"));
const info_1 = __importDefault(require("./info"));
const GlobalFooter_1 = __importDefault(require("ant-design-pro/lib/GlobalFooter"));
const logo_v3_png_1 = __importDefault(require("./logo-v3.png"));
class Index extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            step: 0,
            db: {
                host: 'localhost',
                port: '3306',
                username: 'root',
                password: '123456',
            },
            user: {
                username: 'admin',
                password: '123456'
            }
        };
    }
    componentDidMount() { }
    install() {
        ims_util_1.default.http.post('/ims-install/install', this.state).then(res => {
            console.log(res);
        });
    }
    changeDb(key, value) {
        const { db } = this.state;
        db[key] = value;
        this.setState({
            db
        });
    }
    nextStep() {
        this.setState({
            step: this.state.step + 1
        });
    }
    prevStep() {
        this.setState({
            step: this.state.step - 1
        });
    }
    render() {
        return <div className={install_scss_1.cx({
            imsInstall: true
        })}>
            <div className={install_scss_1.cx({ content: true })}>
                <div className={install_scss_1.cx({
            container: true
        })}>
                    <div className={install_scss_1.cx({
            login: true
        })}>
                        <div className={install_scss_1.cx({
            loginHeader: true
        })}>
                            <img src={logo_v3_png_1.default} alt=""/>
                        </div>
                        <antd_1.Steps style={{ minWidth: '650px' }} current={this.state.step}>
                            <antd_1.Steps.Step title="协议" icon={<antd_1.Icon type="property-safety"/>}></antd_1.Steps.Step>
                            <antd_1.Steps.Step title="配置" icon={<antd_1.Icon type="setting"/>}/>
                            <antd_1.Steps.Step title="账户" icon={<antd_1.Icon type="user"/>}/>
                            <antd_1.Steps.Step title="完成" icon={<antd_1.Icon type="smile-o"/>}/>
                        </antd_1.Steps>
                        <div className={install_scss_1.cx({ mainForm: true })}>
                            {this.state.step === 0 ? <info_1.default next={() => this.nextStep()}/> : null}
                            {this.state.step === 1 ? <setting_1.default prev={() => this.prevStep()} next={() => this.nextStep()}/> : null}
                            {this.state.step === 2 ? <bind_1.default prev={() => this.prevStep()} next={() => this.nextStep()}/> : null}
                            {this.state.step === 3 ? <finish_1.default prev={() => this.prevStep()}/> : null}
                        </div>
                    </div>
                </div>
                <GlobalFooter_1.default copyright={<div>
                    <p>Copyright © 2019 杭州米波网络科技有限公司</p>
                </div>}/>
            </div>
        </div>;
    }
}
exports.default = Index;
