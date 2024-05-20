import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FormationService } from "./formation.service";
import { CreateFormationDto } from "./Dto/formationDto";
import { formation } from "@prisma/client";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Formation")
@Controller("formation")
export class FormationController {
    constructor(private readonly formationService: FormationService) {}

    @Post()
    @ApiCreatedResponse({
        description: "The record has been successfully created.",
        type: Promise<formation>,
    })
    async createFormation(
        @Body() payload: CreateFormationDto,
    ): Promise<formation> {
        return this.formationService.createFormation(payload);
    }

    @ApiOkResponse({
        description: "The record has been successfully retrieve.",
        type: Promise<formation>,
    })
    @Get()
    async getFormation(@Query("id") id: string): Promise<formation> {
        return this.formationService.getFormation(id);
    }

    @ApiOkResponse({
        description: "The records has been successfully retrieve.",
        type: Promise<formation[]>,
    })
    @Get("/all")
    async getFormations(): Promise<formation[]> {
        return this.formationService.getFormations();
    }
}
