import { Type } from 'ims-decorator';
import { visitor } from 'ims-common';
import { AddonMetadataKey, AddonAst } from 'ims-core';
import { transformAddon, TransformOptions } from 'ims-node'
export class ImsApplication {
  stack: Map<string, any> = new Map();
  constructor(public options: TransformOptions) { }
  loadAddon(addon: Type<any>) {
    const context = visitor.visitType(addon);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    transformAddon(context, this.options);
    this.stack.set(addonAst.path, this.getLastStack());
  }
  getLastStack() {
    const stack = this.options.app._router.stack;
    return stack[stack.length - 1]
  }
  unLoadAddon(addon: Type<any>) {
    const context = visitor.visitType(addon);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    const stack = this.stack.get(addonAst.path)
    const index = this.options.app._router.stack.indexOf(stack)
    if (index > -1) {
      this.options.app._router.stack.splice(index, 1)
    }
  }
}
