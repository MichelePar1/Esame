import { IsString, MinLength } from "class-validator";


export class assigmentDto {
    @IsString()
    @MinLength(1)
    title: string
}