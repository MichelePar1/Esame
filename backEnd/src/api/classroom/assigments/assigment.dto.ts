import { IsString } from "class-validator";


export class assigmentDto {
    @IsString()
    title: string
}