import { makeDecorator, MethodContext } from 'ims-decorator';
export const OnReadyMetadateKey = 'OnReadyMetadateKey';
export interface OnReady { }
export const OnReady = makeDecorator<OnReady>(OnReadyMetadateKey);
export class OnReadyAst extends MethodContext<OnReady>{ }