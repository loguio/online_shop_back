import { Module } from "@nestjs/common";
import { FormationService } from "./formation.service";
import { PrismaService } from "src/prisma.service";
import { FormationController } from "./formation.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [FormationController],
    exports: [FormationService],
    providers: [FormationService, PrismaService],
})
export class FormationModule {}
