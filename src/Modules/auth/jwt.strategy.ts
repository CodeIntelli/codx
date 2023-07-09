import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExipration: false,
            secretOrKey: process.env.JWT_SECRET
        })

    }
    // http://nest-learning.com/AKIAVNCR5NB2BNOMZL4W/lsn2HdCAvEaZZSd5Shrp5XLJxeg+CBAQpBxHCbxU
    async validate(payload: any) {
        return {
            id: payload.id
        };
    }
}