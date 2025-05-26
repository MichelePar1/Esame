import { Query, Schema, model } from 'mongoose';
import { assigmentEntity } from './assigments.entity';
import { UserModel } from '../../user/user.model';
import { User } from '../../user/user.entity';
import { TypedRequest } from '../../../lib/typed-request.interface';
import { omit } from 'lodash';
import { isTeacher } from '../../../lib/teacher.middleware';




const assigmentScheme = new Schema<assigmentEntity>({
    title: { type: String, required: true },
    studentsCount: Number,      
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },    
    students:[{
      completed: { type: Boolean, default: false },
      studentsId: { type: Schema.Types.ObjectId, ref: 'User'},
      completedDate: { type: Date, default: null },
      _id: false}],
    classRoomId: { type: String, required: true },
    forStudent: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },{
    versionKey: false
  });


assigmentScheme.virtual('completedCount').get(function(){
  let c=0
  this.students.map(s=>{
    if(s?.completed){
      c+=1
    }
  })
  return c
})

assigmentScheme.virtual('completed').get(function(){
  const student = this.forStudent?.[0] as any;
  let completed
  if(!student?.id){
    return
  }
  this.students.map(s=>{
    if(s.studentsId==student?.id){
      completed = s.completed
    }
  })
  return completed
})

  

assigmentScheme.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret.__v;
        delete ret._id
        delete ret.classRoomId
        delete ret.students
        delete ret.forStudent
        return ret;
    }
});
export const assigmentModel = model<assigmentEntity>('assigmentEntity', assigmentScheme);
