export abstract class ImsAddonFactory {
    abstract create(): any;
    abstract createMicroservice(): any;
    abstract createApplicationContext(): any;
}

export abstract class ImsApplication { }