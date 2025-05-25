import { IsArray, IsString, MinLength,  } from "class-validator"
import { User } from "../user/user.entity"

export class ClassCreateDto {
    @IsString()
    //Così da non poter generare una classe priva di nome
    @MinLength(1)
    name: string
    @IsArray()
    students: string[]
}