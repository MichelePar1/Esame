import { omit } from "lodash";
import { classEntity } from "../classroom.entity";
import { assigmentEntity } from "./assigments.entity";
import { assigmentModel } from "./assigments.model";
import { use } from "passport";
import mongoose from "mongoose";
import { AssigmentAlrCompleted } from "../../../errors/assigment-alr-completed";



export async function addAssigment(data: object): Promise<assigmentEntity> {
    const newClass = new assigmentModel(data);
    (await (await newClass.save()).populate('createdBy'))
    return newClass;    
}

export async function fetchAssigment(userId: string, classRoomId: string): Promise<assigmentEntity[] | null> {
  const listOfAssig = await assigmentModel.find(
    {
      $or: [
        { 'students.studentsId': userId, classRoomId: classRoomId }, 
        { createdBy: userId, classRoomId: classRoomId }
          ]}
  )
  .populate('createdBy')
  .populate({
    path:'forStudent',
    match:{_id: userId}
  }
  )
  return listOfAssig
}

 export async function checkCompleted(userId: string, classId: string, assigmentId: string): Promise<assigmentEntity|null>{
  
  const AlrCompleted = await assigmentModel.findOne({'students.studentsId': userId, _id:assigmentId}).populate({
    path:'forStudent',
    match:{_id: userId}
  })
  const iscomplete = AlrCompleted?.students?.find(
    s => s.studentsId === userId
  );
  if(iscomplete?.completed==true){
    throw new AssigmentAlrCompleted()
  }

  const checkedAssigment = await assigmentModel.findOneAndUpdate({_id:assigmentId, 'students.studentsId': userId, classRoomId: classId},
  {'students.$.completed': true, 'students.$.completedDate': Date.now()},{new:true}).populate('createdBy')
  .populate({
    path:'forStudent',
    match:{_id: userId}
  }
  )
  return checkedAssigment
}

export async function fetchAssigmentInfo(userId: string, classRoomId: string): Promise<assigmentEntity[] | null> {
  const listOfAssig = await assigmentModel.find(
    {
      $or: [
        { 'students.studentsId': userId, classRoomId: classRoomId }, 
        { createdBy: userId, classRoomId: classRoomId }
          ]}
  )
  .populate('createdBy')
  .populate('students.studentsId')
  .populate({
    path:'forStudent',
    match:{_id: userId}
  }
  )
  return listOfAssig
}