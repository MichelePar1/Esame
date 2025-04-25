import { User } from "../user/user.entity";

export type classEntity={
    id?: string,
    name?: string,
    students?: string[];
    createdBy: User|string
}