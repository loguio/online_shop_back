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
            passReqToCallback: true, // Permet de recevoir la requête dans validate()
        });
    }

    validate(
        req: Request,
        payload: { sub: string; email: string },
    ): { sub: string; email: string; refreshToken: string } {
        // Le refresh token est déjà validé par jwtFromRequest
        const refreshToken = req
            ?.get("authorization")
            ?.replace("Bearer", "")
            .trim();

        if (!refreshToken) {
            throw new ForbiddenException("Refresh token malformed");
        }

        return {
            ...payload, // Ajoute les données du payload (sub, email, etc.)
            refreshToken, // Ajoute le refreshToken pour un traitement ultérieur
        };
    }
}
