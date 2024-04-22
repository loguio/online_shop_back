import { Module } from "@nestjs/common";
import { FormationService } from "./formation.service";
import { PrismaService } from "src/prisma.service";
import { FormationController } from "./formation.controller";

@Module({
    imports: [],
    controllers: [FormationController],
    exports: [FormationService],
    providers: [FormationService, PrismaService],
})
export class FormationModule {}
