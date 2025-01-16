import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../shared/constants";
import { RefreshTokenGuard } from "src/shared/guards/refreshToken.guard";
import { AuthDto } from "./dto/authDto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("login")
    signin(@Body() signinDto: Record<string, any>) {
        console.log(signinDto);
        return this.authService.signIn({
            userName: signinDto.login,
            password: signinDto.password,
        });
    }

    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Post("signin")
    signup(@Body() createUserDto: AuthDto) {
        console.log("la ?");
        return this.authService.signUp(createUserDto);
    }

    @Get("logout")
    logout(@Req() req: Request) {
        this.authService.logout(req["user"]["sub"]);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post("refresh")
    refreshTokens(@Req() req: Request) {
        const userID = req["user"]["sub"];
        const refreshToken = req["user"]["refreshToken"];
        return this.authService.refreshTokens(userID, refreshToken);
    }
}
