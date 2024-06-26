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
import { CreateUserDto } from "src/users/dto/createUserDto";
import { RefreshTokenGuard } from "src/shared/guards/refreshToken.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("login")
    signin(@Body() signinDto: Record<string, any>) {
        console.log(signinDto);
        return this.authService.signIn({
            userName: signinDto.userName,
            password: signinDto.password,
        });
    }

    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Post("signup")
    signup(@Body() createUserDto: CreateUserDto) {
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
