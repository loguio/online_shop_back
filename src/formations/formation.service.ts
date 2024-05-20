import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateFormationDto, UpdateFormationDto } from "./Dto/formationDto";
import { formation } from "@prisma/client";

@Injectable()
export class FormationService {
    constructor(private prismaService: PrismaService) {}

    async createFormation(payload: CreateFormationDto): Promise<formation> {
        const existing = await this.prismaService.formation.findUnique({
            where: { name: payload.name },
        });

        if (existing) throw new ConflictException();

        try {
            const result = await this.prismaService.formation.create({
                data: { ...payload },
            });
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Error when creation of the formation");
        }
    }

    async getFormation(id: string): Promise<formation> {
        const result = await this.prismaService.formation.findUniqueOrThrow({
            where: { id },
        });
        return result;
    }

    async getFormations(): Promise<formation[]> {
        const result = await this.prismaService.formation.findMany();
        return result;
    }

    async deleteFormation(id: string) {
        await this.prismaService.formation.delete({
            where: { id },
        });
    }

    async updateFormation(payload: UpdateFormationDto): Promise<formation> {
        const result = await this.prismaService.formation.update({
            where: { id: payload.id },
            data: { ...payload },
        });
        return result;
    }
}
