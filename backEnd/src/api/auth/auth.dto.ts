import { Contains, IsEmail, IsIn, IsString, IsStrongPassword, IsUrl, Matches, MinLength } from "class-validator";
import { matches } from "lodash";

export class AddUserDTO {
    @IsString()
    firstName!: string;
    @IsString()
    lastName!: string;
    @IsEmail()
    username!: string;
    
    password!: string;

    @Matches(/^(student|teacher)$/)
    role!: string;

    @IsUrl()
    picture!: string;
}