import { userNotProf } from "../../errors/not-prof.error";
import { classEntity } from "./classroom.entity";
import { classModel } from "./classroom.model";





export async function addClass(data: classEntity, role: string|undefined): Promise<classEntity> {
    const newClass = new classModel(data);
    await newClass.save();
    await newClass.populate('createdBy')
    return newClass; 
    
}

export async function fetchClass(userId: string): Promise<classEntity[]>{
    let listOfClasses: classEntity[] = []
    listOfClasses = await classModel.find({$or: [{ students: userId },{ createdBy: userId }]}).populate('createdBy')  
    return listOfClasses
}


export async function getSpecificClass(classId: string): Promise<classEntity | null> {
    return await classModel.findById(classId);
}