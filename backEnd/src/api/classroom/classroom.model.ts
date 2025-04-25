import { Schema, model } from 'mongoose';
import { classEntity } from './classroom.entity';

const classroomScheme = new Schema<classEntity>({
    id: String,
    name: String,
    students: [String],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' } ,
});


classroomScheme.virtual('studentsCount').get(function () {
    return this.students?.length || 0;
});


classroomScheme.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret.__v;
        delete ret.students
        return ret;
    }
});
export const classModel = model<classEntity>('classEntity', classroomScheme);
