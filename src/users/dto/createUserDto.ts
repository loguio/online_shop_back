import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/address/dto/create-address.dto";

export class CreateUserDto {
    @IsString()
    userName: string;

    @IsString()
    password: string;

    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address?: CreateAddressDto;
}
