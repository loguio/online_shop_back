import { Injectable } from "@nestjs/common";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async getUserByName(userName: string): Promise<users> {
        const user = await this.prismaService.users.findUnique({
            where: { userName },
        });
        return user;
    }
    async getUserByID(id: string): Promise<users> {
        const user = await this.prismaService.users.findUnique({
            where: { id },
        });
        return user;
    }

    async create(user: CreateUserDto) {
        const createdUser = await this.prismaService.users.create({
            data: {
                ...user,
                address: user.address
                    ? { create: { ...user.address } }
                    : undefined,
            },
        });
        return createdUser;
    }

    async update(id: string, data: UpdateUserDto) {
        const updatedUser = this.prismaService.users.update({
            where: { id },
            data: {
                ...data,
                address: data.address
                    ? { delete: true, create: { ...data.address } }
                    : undefined,
            },
        });
        return updatedUser;
    }
}
