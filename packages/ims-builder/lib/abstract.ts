import { TypeContext } from "ims-decorator";

export abstract class ImsBuilder {
    abstract build(addon: TypeContext): Promise<any>;
}
