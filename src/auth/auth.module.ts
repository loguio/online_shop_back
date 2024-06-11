import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { RtStrategy } from "./strategies/refreshToken.strategy";
import { ConfigModule } from "@nestjs/config";
import { AtStrategy } from "./strategies/accessToken.strategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, RtStrategy, AtStrategy],
    imports: [UsersModule, JwtModule.register({}), ConfigModule],
    exports: [AuthService],
})
export class AuthModule {}
