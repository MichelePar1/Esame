import { IsArray, IsString } from "class-validator"
import { User } from "../user/user.entity"

export class ClassCreateDto {
    @IsString()
    name: string
    @IsArray()
    students: string[]
}