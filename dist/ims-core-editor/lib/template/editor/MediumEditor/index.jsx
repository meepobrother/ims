"use strict";
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
const react_dom_1 = __importDefault(require("react-dom"));
const lib_1 = __importDefault(require("./lib"));
require("medium-editor/dist/css/medium-editor.css");
require("./index.less");
const l = '800';
class RcMediumEditor extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        };
    }
    componentDidMount() {
        this.dom = react_dom_1.default.findDOMNode(this);
        this.medium = new lib_1.default(this.dom, this.props.options);
        this.medium.subscribe('editableInput', e => {
            this._updated = true;
            this.change(this.dom.innerHTML);
        });
    }
    componentDidUpdate() {
        this.medium.restoreSelection();
    }
    componentWillUnmount() {
        this.medium.destroy();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.text !== this.state.text && !this._updated) {
            this.setState({ text: nextProps.text });
        }
        if (this._updated)
            this._updated = false;
    }
    change(text) {
        if (this.props.onChange)
            this.props.onChange(text, this.medium);
    }
    render() {
        const { options, text, contentEditable, dangerouslySetInnerHTML, ...props } = this.props;
        const _props = props;
        _props.dangerouslySetInnerHTML = { __html: this.state.text };
        return <div {..._props}/>;
    }
}
RcMediumEditor.defaultProps = {
    text: '',
    options: {
        imageDragging: true,
        toolbar: {
            allowMultiParagraphSelection: !0,
            firstButtonClass: "medium-editor-button-first",
            lastButtonClass: "medium-editor-button-last",
            relativeContainer: document.body,
            standardizeSelectionStart: !1,
            static: !0,
            updateOnEmptySelection: !0,
            buttons: [
                {
                    name: "formatBold",
                    aria: "",
                    contentDefault: '<i class="bold-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "粗体（⌘ + B）",
                        "data-tooltip-delay": l,
                        "data-shotcut": "command + b, ctrl + b"
                    }
                }, {
                    name: "italic",
                    aria: "",
                    contentDefault: '<i class="italic-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "斜体（⌘ + I）",
                        "data-tooltip-delay": l,
                        "data-shotcut": "command + i, ctrl + i"
                    }
                }, {
                    name: "underline",
                    aria: "",
                    contentDefault: '<i class="underline-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "下划线（⌘ + U）",
                        "data-tooltip-delay": l,
                        "data-shotcut": "command + u, ctrl + u"
                    }
                }, {
                    name: "h2",
                    aria: "",
                    contentDefault: '<i class="h1-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "标题一",
                        "data-tooltip-delay": l
                    }
                }, {
                    name: "h3",
                    aria: "",
                    contentDefault: '<i class="h2-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "标题二",
                        "data-tooltip-delay": l
                    }
                }, {
                    name: "quote",
                    aria: "",
                    contentDefault: '<i class="quote-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "引语",
                        "data-tooltip-delay": l
                    }
                }, {
                    name: "formatHighlight",
                    aria: "",
                    contentDefault: '<i class="highlight-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "代码块",
                        "data-tooltip-delay": l
                    }
                }, {
                    name: "formatCode",
                    aria: "",
                    contentDefault: '<i class="code-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "行内代码",
                        "data-tooltip-delay": l
                    }
                }, {
                    name: "formatUnorderedList",
                    aria: "",
                    contentDefault: '<i class="unordered-list-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "无序列表",
                        "data-tooltip-delay": l
                    }
                }, {
                    name: "formatOrderedList",
                    aria: "",
                    contentDefault: '<i class="ordered-list-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "有序列表",
                        "data-tooltip-delay": l
                    }
                }, {
                    name: "formatLink",
                    aria: "",
                    contentDefault: '<i class="link-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "链接（⌘ + K）",
                        "data-tooltip-delay": l,
                        "data-shotcut": "command + k, ctrl + k"
                    }
                }, {
                    name: "uploadImage",
                    aria: "",
                    contentDefault: '<i class="upload-image-icon icon"></i>',
                    attrs: {
                        "data-tooltip": "插入图片",
                        "data-tooltip-delay": l
                    }
                }
            ]
        },
        placeholder: {
            text: '尽情创作吧...'
        }
    },
    className: 'ims-medium-editor'
};
exports.default = RcMediumEditor;
