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
require("./index.less");
const layout_1 = __importDefault(require("../layout"));
const MediumEditor_1 = __importDefault(require("../MediumEditor"));
const mobx_react_1 = require("mobx-react");
let Index = class Index extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            focus: false
        };
        this.onChange = (text, medium) => {
            this.props.editor.setContent(text);
        };
    }
    render() {
        return <layout_1.default type="rich">
            <div className="ims-core-ditor-rich">
                <div className="ims-core-ditor-rich-content">
                    <MediumEditor_1.default text={this.props.editor.content} focus={this.state.focus} onChange={this.onChange}/>
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
