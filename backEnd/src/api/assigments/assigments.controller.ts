import { TypedRequest } from "../../lib/typed-request.interface";
import { addClass, getSpecificClass } from "../classroom/classroom.service";
import { User } from "../user/user.entity";
import { Request, Response, NextFunction } from "express";
import { assigmentDto } from "./assigment.dto";
import { assigmentEntity } from "./assigments.entity";
import { addAssigment, fetchAssigment } from "./assigments.service";
import { classEntity } from "../classroom/classroom.entity";
import mongoose from "mongoose";
import { ClassRoomNotFoundError } from "../../errors/classRoom-not-found.error";
import { wrongClassroomError } from "../../errors/wrongClass.error";
import dayjs from "dayjs";




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

      const Objectaa = {
        title: title,
        studentsCount: specClass?.students?.length,
        completedCount: "0",
        completed: false,
        createdAt: date,
        createdBy: specClass?.createdBy,
        studentId: specClass?.students,
        classRoomId: classId
      }
      
  
      const result = await addAssigment(Objectaa)
      result.createdAt = new Date(dayjs(result.createdAt).format('YYYY-MM-DD'));
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


      const result = await fetchAssigment(userId, classId)
    res.json(result).status(200)
  }catch(err){
    next(err)
  }

}
