import { Schema, model } from 'mongoose';
import { User } from './user.entity';

const userSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    role: String,
    picture: String
},{
  //non salvo la versione   
  versionKey: false
});

userSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id;
        delete ret._v;
        return ret;
    }
});

userSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret._v;
        return ret;
    }
});

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

export const UserModel = model<User>('User', userSchema);