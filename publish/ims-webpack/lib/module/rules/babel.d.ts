export declare type IBabelModule = "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false;
export default function (modules?: IBabelModule): {
    presets: (string | (string | {
        modules: IBabelModule;
        targets: {
            browsers: string[];
        };
    })[])[];
    plugins: (string | (string | {
        helpers: boolean;
    })[] | (string | {
        legacy: boolean;
    })[])[];
};
