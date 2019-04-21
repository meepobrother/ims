import { buildTaro, buildAppPages } from '../lib'
import { visitor } from "ims-common";
import { ImsDemo } from "./weapp";
const context = visitor.visitType(ImsDemo);
// 修改
buildAppPages(context).then(res => {
    console.log(res)
});
buildTaro('weapp', true);