import { User } from "./user.entity";

export type classroomEntity = {
    id?: string,
    name?: string,
    students?: string[];
    createdBy: User|string
    studentsCount: number
}