import { User } from "../user/user.entity";


export type assigmentEntity = {
    id: string,
    title: string,
    students:Array<{
        studentsId: [string]
        completd: [boolean]
    }>
    studentsCount: string,
    completedCount: string,
    createdAt: Date,
    createdBy: User|string
    classRoomId: string
}

export type PopulateCreatedBy = Omit<assigmentEntity, 'createdBy'> & {
    createdBy: User | null;
}