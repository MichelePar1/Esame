import { Contains, IsEmail, IsString, IsStrongPassword, IsUrl, Matches, MinLength } from "class-validator";
import { matches } from "lodash";

export class AddUserDTO {
    @IsString()
    firstName!: string;
    @IsString()
    lastName!: string;
    @IsEmail()
    username!: string;
    @MinLength(4)
    password!: string;
    
    role!: string;
    @IsUrl()
    picture!: string;
}