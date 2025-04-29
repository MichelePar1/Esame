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
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        delete ret.students
        return ret;
    }
});
export const classModel = model<classEntity>('classEntity', classroomScheme);
