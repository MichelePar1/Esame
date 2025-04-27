import { User } from "../user/user.entity";


export type assigmentEntity = {
    id: string,
    title: string,
    students:Array<{
        studentsId: [string]
        completed: [boolean]
    }>
    studentsCount: string,
    completedCount: string,
    createdAt: Date,
    createdBy: User|string
    classRoomId: string
    forStudent?: [User|string]
}

export type PopulateCreatedBy = Omit<assigmentEntity, 'createdBy'> & {
    createdBy: User | null;
}