import { User } from "../user/user.entity";


export type assigmentEntity = {
    id: string,
    title: string,
    studentId: [string],
    studentsCount: string,
    completedCount: string,
    completed: boolean;
    createdAt: Date,
    createdBy: User|string
    classRoomId: string
}

export type PopulateCreatedBy = Omit<assigmentEntity, 'createdBy'> & {
    createdBy: User | null;
}