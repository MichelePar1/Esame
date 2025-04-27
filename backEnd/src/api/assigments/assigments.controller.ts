import { TypedRequest } from "../../lib/typed-request.interface";
import { addClass, getSpecificClass } from "../classroom/classroom.service";
import { User } from "../user/user.entity";
import { Request, Response, NextFunction } from "express";
import { assigmentDto } from "./assigment.dto";
import { assigmentEntity } from "./assigments.entity";
import { addAssigment, fetchAssigment, checkCompleted } from "./assigments.service";
import { classEntity } from "../classroom/classroom.entity";
import mongoose from "mongoose";
import { ClassRoomNotFoundError } from "../../errors/classRoom-not-found.error";
import { wrongClassroomError } from "../../errors/wrongClass.error";
import dayjs from "dayjs";
import { json } from "body-parser";
import { omit } from "lodash";
import { use } from "passport";




export const createAssigment = async (
    req: TypedRequest<assigmentDto>, 
    res: Response, 
    next: NextFunction) => {
      try{      
        
      const { title } = req.body;
      const userId = (req.user as User).id!
      const classId = req.params.classId;
      const date = dayjs().format('YYYY-MM-DD');

      const specClass = await getSpecificClass(classId)
      if(!specClass){
        throw new ClassRoomNotFoundError()
      }
      if(userId!=specClass?.createdBy){
        throw new wrongClassroomError()
      }
      console.log(specClass.students)
      const Objectaa = {
        title: title,
        studentsCount: specClass?.students?.length,
        completedCount: "0",
        createdAt: date,
        createdBy: specClass?.createdBy,
        students: specClass?.students?.map(student=>({
          studentsId: student,
          completed: false
        })),
        classRoomId: classId,
        forStudent: specClass.students

      }
      
      const result = await addAssigment(Objectaa)
      res.json(result).status(200)
    }catch(err){
      next(err)
    }
  
}

export const listAssigments = async (
  req: TypedRequest<assigmentDto>, 
  res: Response, 
  next: NextFunction) => {
    try{      
      const userId = (req.user as User).id!
      const classId = req.params.classId;
      const specClass = await getSpecificClass(classId)
      if(!specClass){
        throw new ClassRoomNotFoundError()
      }
      if((userId!=specClass?.createdBy)&&((req.user as User).role == "teacher")){
        throw new wrongClassroomError()
      }
      if(!specClass.students?.find(s=>s==userId)){
        //lancia l'errore sbagliato ma è per farmi una idea
        throw new wrongClassroomError()
      }
      
      const result = await fetchAssigment(userId, classId)

    res.json(result).status(200)
  }catch(err){
    next(err)
  }
}

export const CompleteAssigment = async (
  req: TypedRequest<assigmentDto>, 
  res: Response, 
  next: NextFunction) => {
    try{      
      const userId = (req.user as User).id!
      const classId = req.params.classId;
      const assigmentId = req.params.id
      const specClass = await getSpecificClass(classId)
      if(!specClass){
        throw new ClassRoomNotFoundError()
      } 
      if((userId!=specClass?.createdBy)&&((req.user as User).role == "teacher")){
        throw new wrongClassroomError()
      }
      if(!specClass.students?.find(s=>s==userId)){
        //lancia l'errore sbagliato ma è per farmi una idea
        throw new wrongClassroomError()
      }

      console.log(specClass.students)
      const result = await checkCompleted(userId, classId, assigmentId)

    res.json(result).status(200)
  }catch(err){
    next(err)
  }

}

