import { User } from "./user.entity";



export type assigmentInfoEntity = {
    students: Array<{studentsId: User|string, completed: boolean, completedDate: Date}>
}