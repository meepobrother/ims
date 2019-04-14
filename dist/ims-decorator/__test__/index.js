"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const chai_1 = require("chai");
class ImsDemo {
}
describe('ims-decorator', () => {
    it('isType', () => {
        chai_1.expect(index_1.isType(ImsDemo)).to.equal(true);
    });
    it('makeDecorator', () => {
        const common = index_1.makeDecorator('common');
        const res = common()(ImsDemo);
        const context = index_1.getContext(res);
        const commonAsts = context.getClassAst('common');
        chai_1.expect(commonAsts.length).to.equal(1);
        const commonAst = commonAsts[0];
        chai_1.expect(commonAst.metadataKey).to.equal('common');
        chai_1.expect(index_1.isClassAst(commonAst)).to.equal(true);
        let Demo2 = class Demo2 {
        };
        __decorate([
            common(),
            __metadata("design:type", String)
        ], Demo2.prototype, "id", void 0);
        Demo2 = __decorate([
            common()
        ], Demo2);
        const demo2Context = index_1.getContext(Demo2);
        chai_1.expect(demo2Context.propertys.every(it => index_1.isPropertyAst(it))).to.equal(true);
    });
});
