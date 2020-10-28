import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.auth;
      }]),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // TODO: move to .env
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}