import { Addon } from "ims-core";
import { imsDemoTemplate } from './template'
import { imsDemoTypeorm } from './typeorm'
import * as incs from './inc';
@Addon({
    template: imsDemoTemplate,
    typeorm: imsDemoTypeorm,
    incs: incs,
    sourceRoot: __dirname,
    path: '/',
    title: "测试",
    version: "1.0.0"
})
export default class imsDemo { }
