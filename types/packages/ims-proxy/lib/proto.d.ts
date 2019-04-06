/// <reference types="node" />
declare const configure: {
    Message: import("../../ims-protons/lib").IProtons<{
        type: "connect" | "response";
        key: number;
        payload: {
            type: string;
            data: Buffer;
            path: string;
            host: string;
        };
    }>;
    Request: import("../../ims-protons/lib").IProtons<{
        key: number;
        method: string;
        body: string;
        path: string;
        headers: string;
        hostname: string;
    }>;
    Socket: import("../../ims-protons/lib").IProtons<{
        data: string;
        key: number;
        type: string;
    }>;
};
export default configure;
