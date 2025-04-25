import { classEntity } from "../classroom/classroom.entity";
import { assigmentEntity } from "./assigments.entity";
import { assigmentModel } from "./assigments.model";



export async function addAssigment(data: object): Promise<assigmentEntity> {
    const newClass = new assigmentModel(data);
    await newClass.save();
    await newClass.populate('createdBy')
    return newClass;    
}

export async function fetchAssigment(userId: string, classRoomId: string): Promise<assigmentEntity[] | null> {
  const listOfAssig = await assigmentModel.find(
    {
      $or: [
        { studentId: userId, classRoomId: classRoomId }, 
        { createdBy: userId, classRoomId: classRoomId }
          ]}
  ).populate('createdBy');
       return listOfAssig
}