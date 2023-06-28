import { IsString, IsNumber, IsNotEmpty, IsEmail } from "@nestjs/class-validator";
import { MinLength } from "class-validator";
//Creo las validaciones de tipo interface
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;
    @IsString()
    @IsNotEmpty()
    apellidos: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    sexo: string;

    @IsNumber()
    @IsNotEmpty()
    edad: number;
}
