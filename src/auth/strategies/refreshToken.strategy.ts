import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>("JWT_REFRESH_SECRET"),
            passReqToCallback: true,
        });
    }

    validate(
        req: Request,
        payload: { accessToken: string },
    ): { accessToken: string; refreshToken: string } {
        const refreshToken = req
            ?.get("authorization")
            ?.replace("Bearer", "")
            .trim();

        if (!refreshToken)
            throw new ForbiddenException("Refresh token malformed");

        return {
            ...payload,
            refreshToken,
        };
    }
}
