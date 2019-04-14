"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const react_ace_1 = __importDefault(require("react-ace"));
const layout_1 = __importDefault(require("../layout"));
const marked_1 = __importDefault(require("marked"));
require("brace/mode/markdown");
require("brace/theme/github");
const index_1 = require("./preview/index");
require("./index.less");
const mobx_react_1 = require("mobx-react");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let Index = class Index extends react_1.Component {
    constructor() {
        super(...arguments);
        this.$change = new rxjs_1.Subject();
    }
    componentDidMount() {
        this.$change.pipe(operators_1.debounceTime(300)).subscribe(res => {
            this.props.editor.setContent(marked_1.default(res));
        });
    }
    componentWillUnmount() {
        this.props.editor.setContent(``);
    }
    render() {
        const width = '50vw';
        const btnProps = {
            size: "small", type: "ghost"
        };
        return <layout_1.default type="markdown">
            <div className="ims-core-ditor-markdown">
                <div className="editor">
                    <div className="editor-content">
                        <react_ace_1.default height={"100%"} width={width} fontSize={14} style={{ lineHeight: 1.7, marginTop: '20px' }} name="编辑器" mode="markdown" theme="github" onChange={(input) => {
            this.$change.next(input);
        }} onLoad={(props) => {
            props.$blockScrolling = Infinity;
        }}/>
                    </div>
                    <div className="editor-footer">
                        <antd_1.Button {...btnProps}>
                            <antd_1.Icon type="file-markdown"/>
                        </antd_1.Button>
                        <antd_1.Button {...btnProps}>
                            <antd_1.Icon type="picture"/>
                        </antd_1.Button>
                        <div className="editor-footer-right">
                            <antd_1.Button {...btnProps}>
                                <antd_1.Icon type="swap"/>
                            </antd_1.Button>
                        </div>
                    </div>
                </div>
                <div className="preview" style={{ width: `calc(100vw - ${width})` }}>
                    <div className="preview-content">
                        <index_1.Preview></index_1.Preview>
                    </div>
                    <div className="preview-footer">
                        <div className="title">预览</div>
                        <div className="word-coun">字数</div>
                    </div>
                </div>
            </div>
        </layout_1.default>;
    }
};
Index = __decorate([
    mobx_react_1.inject('editor'),
    mobx_react_1.observer
], Index);
exports.default = Index;
