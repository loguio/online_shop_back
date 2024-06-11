import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/createUserDto";
import { AuthDto } from "./dto/authDto";
import { Tokens } from "./types/tokens.type";
import { JwtPayload } from "./types/jwtPayload.type";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async signUp(dto: CreateUserDto): Promise<Tokens> {
        const user = await this.userService.create({
            userName: dto.userName,
            password: dto.password,
        });

        const tokens = await this.getTokens(user.id, user.userName);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async signIn(dto: AuthDto): Promise<Tokens> {
        const user = await this.userService.getUserByName(dto.userName);

        if (!user) throw new ForbiddenException("Access Denied");

        const passwordMatches = user.password == dto.password;
        if (!passwordMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.userName);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(userID: string): Promise<boolean> {
        await this.userService.update(userID, { refreshToken: null });
        return true;
    }

    async refreshTokens(userID: string, rt: string): Promise<Tokens> {
        const user = await this.userService.getUserByID(userID);
        if (!user || !user.refreshToken)
            throw new ForbiddenException("Access Denied");

        const rtMatches = user.refreshToken == rt;
        if (!rtMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.userName);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async updateRtHash(userID: string, rt: string): Promise<void> {
        await this.userService.update(userID, { refreshToken: rt });
    }

    async getTokens(userID: string, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userID,
            userName: email,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>("JWT_ACCESS_SECRET"),
                expiresIn: "15min",
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>("JWT_REFRESH_SECRET"),
                expiresIn: "7d",
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }
}
