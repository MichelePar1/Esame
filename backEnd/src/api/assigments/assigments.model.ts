import { Schema, model } from 'mongoose';
import { assigmentEntity } from './assigments.entity';

const assigmentScheme = new Schema<assigmentEntity>({
    title: { type: String, required: true },
    studentsCount: Number,      
    completedCount: Number,       
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classRoomId: { type: String, required: true },
    studentId: [{ type: String }] 
  });


assigmentScheme.virtual('byTeacher').get(function () {
    if (typeof this.createdBy === 'object' && 'role' in this.createdBy) {
        return this.createdBy.role === 'teacher';
    }
    return false;
});


assigmentScheme.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret.__v;
        delete ret.students
        delete ret.studentId
        delete ret._id
        delete ret.classRoomId
        if (ret.byTeacher) {
            delete ret.completed;
        }
        delete ret.byTeacher;
        return ret;
    }
});
export const assigmentModel = model<assigmentEntity>('assigmentEntity', assigmentScheme);
