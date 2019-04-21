import { TypeContext } from "ims-decorator";
export declare abstract class ImsBuilder {
    abstract build(addon: TypeContext): Promise<any>;
}
