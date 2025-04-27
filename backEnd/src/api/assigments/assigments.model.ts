import { Query, Schema, model } from 'mongoose';
import { assigmentEntity } from './assigments.entity';
import { UserModel } from '../user/user.model';
import { User } from '../user/user.entity';
import { TypedRequest } from '../../lib/typed-request.interface';
import { omit } from 'lodash';
import { isTeacher } from '../../lib/teacher.middleware';




const assigmentScheme = new Schema<assigmentEntity>({
    title: { type: String, required: true },
    studentsCount: Number,      
    completedCount: Number,       
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },    
    students:[{
      completed: { type: Boolean, default: false },
      studentsId: { type: String }}] ,
    classRoomId: { type: String, required: true },
    forStudent: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]

  });

assigmentScheme.virtual('completed').get(function(){
  const student = this.forStudent?.[0] as any;
  let cc 
  this.students.map(s=>{
    if(s.studentsId==student.id){
      console.log(s.completed)
      cc = s.completed
    }
  })
  return cc
   

})

  

assigmentScheme.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret.__v;
        delete ret._id
        delete ret.classRoomId
        delete ret.students
        return ret;
    }
});
export const assigmentModel = model<assigmentEntity>('assigmentEntity', assigmentScheme);
