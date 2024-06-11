import { Type } from "class-transformer";
import {
    IsArray,
    IsDate,
    IsOptional,
    IsUUID,
    ValidateNested,
} from "class-validator";
import { CreateAddressDto } from "src/address/dto/create-address.dto";

export class CreateOrderDto {
    @IsArray()
    @Type(() => String)
    articleIDs: string[];

    @IsUUID()
    userID: string;

    @ValidateNested()
    @Type(() => CreateAddressDto)
    shipTo: CreateAddressDto;

    @IsDate()
    @IsOptional()
    shipped?: Date;
}
