export class ImsError extends Error {
    constructor(msg: string, public data?: any, public code?: string) {
        super(msg)
    }
}