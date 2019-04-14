"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const k = __importStar(require("./keys"));
exports.Addon = ims_decorator_1.makeDecorator(k.AddonMetadataKey);
exports.Controller = ims_decorator_1.makeDecorator(k.ControllerMetadataKey);
exports.Template = ims_decorator_1.makeDecorator(k.TemplateMetadataKey);
exports.Typeorm = ims_decorator_1.makeDecorator(k.TypeormMetadataKey);
exports.Cli = ims_decorator_1.makeDecorator(k.CliMetadataKey);
exports.Command = ims_decorator_1.makeDecorator(k.CommandMetadataKey);
exports.Version = ims_decorator_1.makeDecorator(k.VersionMetadataKey);
exports.Body = ims_decorator_1.makeDecorator(k.BodyMetadataKey);
exports.Next = ims_decorator_1.makeDecorator(k.NextMetadataKey);
exports.Query = ims_decorator_1.makeDecorator(k.QueryMetadataKey);
exports.Redirect = ims_decorator_1.makeDecorator(k.RedirectMetadataKey);
exports.Req = ims_decorator_1.makeDecorator(k.ReqMetadataKey);
exports.Res = ims_decorator_1.makeDecorator(k.ResMetadataKey);
exports.Session = ims_decorator_1.makeDecorator(k.SessionMetadataKey);
exports.Upload = ims_decorator_1.makeDecorator(k.UploadMetadataKey);
exports.Uploads = ims_decorator_1.makeDecorator(k.UploadsMetadataKey);
