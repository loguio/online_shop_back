import { Injectable } from "@nestjs/common";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./usersDto/createUserDto";
import { UpdateUserDto } from "./usersDto/UpdateUserDto";

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async getUserByName(firstName: string): Promise<users> {
        const user = await this.prismaService.users.findUnique({
            where: { firstName },
        });
        return user;
    }
    async getUserById(id: string): Promise<users> {
        const user = await this.prismaService.users.findUnique({
            where: { id },
        });
        return user;
    }

    async create(user: CreateUserDto) {
        const createdUser = await this.prismaService.users.create({
            data: { ...user },
        });
        return createdUser;
    }

    async update(id: string, data: UpdateUserDto) {
        const updatedUser = this.prismaService.users.update({
            where: { id },
            data: { ...data },
        });
        return updatedUser;
    }
}
