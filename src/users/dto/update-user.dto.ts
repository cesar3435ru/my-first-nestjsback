import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional} from "@nestjs/class-validator";
import { IsNumber } from 'class-validator';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    nombre: string;
    @IsString()
    apellidos: string;
    @IsString()
    // @IsOptional()
    password: string;
    @IsString()
    sexo: string;
    @IsNumber()
    edad: number;
}
