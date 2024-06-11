import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { PrismaService } from "src/prisma.service";
import { Address } from "./entities/address.entity";
import { addressSelector } from "./selector/address.selector";

@Injectable()
export class AddressService {
    constructor(readonly prismaService: PrismaService) {}

    async create(createAddressDto: CreateAddressDto) {
        const result = await this.prismaService.address.create({
            data: { ...createAddressDto },
        });
        return result;
    }

    async findAll(): Promise<Address[]> {
        return await this.prismaService.address.findMany({
            select: addressSelector,
        });
    }

    async findOne(id: string): Promise<Address> {
        try {
            return await this.prismaService.address.findUniqueOrThrow({
                where: { id },
                select: addressSelector,
            });
        } catch (e) {
            throw new NotFoundException();
        }
    }

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        return await this.prismaService.address.update({
            where: { id },
            data: {
                ...updateAddressDto,
            },
        });
    }

    async remove(id: string) {
        return await this.prismaService.address.delete({
            where: { id },
        });
    }
}
