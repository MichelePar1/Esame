import { User } from "./user.entity";


export type assigmentEntity = {
    id: string,
    title: string,
    createdBy: User|string
    completedCount: number
    completed?: boolean
    studentsCount: number
    createdAt: Date
}