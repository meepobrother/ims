export class ImsError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}
export class UnauthorizedException extends ImsError {
    constructor() {
        super(`UnauthorizedException`)
    }
}
