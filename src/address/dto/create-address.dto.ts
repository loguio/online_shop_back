import { IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    zipCode: string;
    @IsString()
    city: string;
    @IsString()
    address: string;
}
