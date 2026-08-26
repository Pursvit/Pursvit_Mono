import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("JWT_SECRET")!,
      /*
            currently bypassing the type validation which require a fallback key
            TODO: we have to add the validation pipeline to ensure the system throw error if no key is found
      */
    });
  }
  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, userName: payload.username };
  }
}
