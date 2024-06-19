import { Controller, Get, Patch } from "@nestjs/common";
import { User } from "../core/decorators/user.decorator";
import { UsersService } from "./users.service";
import { User as UserEntity } from "./entities/users.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("me")
    async getMeRequest(@User() user): Promise<UserEntity> {
        return this.usersService.getUserByID(user.sub);
    }

    @Patch("last-login")
    async updateLastLogin(@User() me) {
        return this.usersService.update(me.sub, {});
    }
}
