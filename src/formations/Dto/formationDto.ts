import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";

export class CreateFormationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    shortName: string;

    @IsNumber()
    certificationLvl: number;

    @IsNumber()
    hoursCount: number;

    @IsNumber()
    dayCount: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsBoolean()
    isActive: boolean;
}

export class UpdateFormationDto {
    id: string;
    name: string;
    shortName: string;
    certificationLvl: number;
    hoursCount: number;
    dayCount: number;
    description: string;
    isActive: boolean;
}
