import { IsString, IsNumber, IsNotEmpty } from "@nestjs/class-validator";
//Creo las validaciones de tipo interface
export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    description: string;
    // @IsOptional()
    // description?: string;
    @IsNumber()
    important: number;

    u_id: number

}
