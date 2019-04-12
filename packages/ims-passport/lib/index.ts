import { use, authenticate, serializeUser, deserializeUser, Strategy } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { getKey } from 'ims-node';

export class ImsPassport {
    use(name: string, strategy: Strategy) {
        const key = getKey()
        use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: key.pubKey
        }, (payload: any, done: VerifiedCallback) => { })
    }
}