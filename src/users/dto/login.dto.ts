import { IsString, IsNotEmpty, IsEmail } from "@nestjs/class-validator";
import { MinLength } from "class-validator";
export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}