import { round } from "lodash";
import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';
import { QueryNotRightError } from "../../errors/Query.error";

export class UserExistsError extends Error {
    constructor() {
        super();
        this.name = 'UserExists';
        this.message = 'username already in use';
    }
}

export class UserService {

    async add(user: User, credentials: {username: string, password: string}): Promise<User> {
        const existingIdentity = await UserIdentityModel.findOne({'credentials.username': credentials.username});
        if (existingIdentity) {
            throw new UserExistsError();
        }
        const newUser = await UserModel.create(user);
        
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
    
        await UserIdentityModel.create({
            provider: 'local',
            user: newUser.id,
            credentials: {
                username: credentials.username,
                hashedPassword
            }
        });
    
        return newUser;
    }
}


export async function fetch(ruolo: string): Promise<User[]>{

    let listOfUser: User[] = [];
      console.log(ruolo)
    if(!ruolo){
        listOfUser = await UserModel.find();  
        return listOfUser    
    }
    if((ruolo=="student")||((ruolo=="teacher"))){
        listOfUser = await UserModel.find({role: ruolo});  

    }else{
        throw new QueryNotRightError()
        
    }
    
    return listOfUser    

}

export default new UserService();