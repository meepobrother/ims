import { Injectable, Inject } from 'ims-core';
import { Injector } from '../lib'
@Injectable()
export class ImsDemo { }

@Injectable()
export class ImsDemo2 {
    @Inject()
    demo: ImsDemo;
    constructor() { }
}

const demo2 = Injector.get(ImsDemo2);

debugger;