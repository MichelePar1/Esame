import { Query, Schema, model } from 'mongoose';
import { assigmentEntity } from './assigments.entity';
import { UserModel } from '../user/user.model';
import { User } from '../user/user.entity';
import { TypedRequest } from '../../lib/typed-request.interface';
import { omit } from 'lodash';
import { isTeacher } from '../../lib/teacher.middleware';

//per far si che lo possa prendere dentro assigmentScheme.set 
// estende l'entita di assigmentEntity altrimenti non lo posso usare come "filtro"
interface AssigmentUserRole extends assigmentEntity{
    _userRole: string  
}



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


  assigmentScheme.pre('find', function(next){
    const userRole = this.getOptions().userRole
    next()
  })

  assigmentScheme.post('find', function(documenti, next){
    const userRole = this.getOptions().userRole
    documenti.forEach(doc => {
        doc._userRole = userRole
    });
    next()
  })

  assigmentScheme.post('save', function(documenti, next){
    delete documenti.toObject().completed
    next()
  })

assigmentScheme.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        const documenti = _ as unknown as AssigmentUserRole
        if(documenti._userRole==='teacher'){
            delete ret.completed
        }
        delete ret.__v;
        delete ret.students
        delete ret.studentId
        delete ret._id
        delete ret.classRoomId
        return ret;
    }
});
export const assigmentModel = model<assigmentEntity>('assigmentEntity', assigmentScheme);
