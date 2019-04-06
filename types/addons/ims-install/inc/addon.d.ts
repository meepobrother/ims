export declare class ImsAddon {
    getAll(uniacid: number): {
        uniacid: number;
    };
    getByStatus(): string;
    install(): string;
    uninstall(): string;
    upgrade(): string;
}
