import { omit } from "lodash";
import { classEntity } from "../classroom/classroom.entity";
import { assigmentEntity } from "./assigments.entity";
import { assigmentModel } from "./assigments.model";



export async function addAssigment(data: object): Promise<assigmentEntity> {
    const newClass = new assigmentModel(data);
    (await (await newClass.save()).populate('createdBy'))
    return newClass;    
}

export async function fetchAssigment(userId: string, classRoomId: string, userRole: string): Promise<assigmentEntity[] | null> {
  const listOfAssig = await assigmentModel.find(
    {
      $or: [
        { studentId: userId, classRoomId: classRoomId }, 
        { createdBy: userId, classRoomId: classRoomId }
          ]}
  ).setOptions({userRole}) //setOptions, così evito di fare tutti i controlli nel controller
  .populate('createdBy')
       return listOfAssig
}