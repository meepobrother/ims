"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const ims_common_1 = require("ims-common");
const weapp_1 = require("./weapp");
const context = ims_common_1.visitor.visitType(weapp_1.ImsDemo);
// 修改
lib_1.buildAppPages(context).then(res => {
    console.log(res);
});
lib_1.buildTaro('weapp', true);
