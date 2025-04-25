import { ClassCreateDto } from "./classroom.dto";
import { TypedRequest } from "../../lib/typed-request.interface";
import { addClass, fetchClass } from "./classroom.service";
import { classEntity } from "./classroom.entity";

import { Request, Response, NextFunction } from "express";
import { User } from "../user/user.entity";

export const createClass = async (
    req: TypedRequest<ClassCreateDto>, 
    res: Response, 
    next: NextFunction) => {
      try{       const { name, students } = req.body;
      const userId = (req.user as User).id!
      
      const ClassObj  ={
          name: name,
          createdBy: userId,      
          students: students
        }
      const newClass = await addClass(ClassObj, (req.user as User).role);
      res.json(newClass).status(200)
    }catch(err){
      next(err)
    }
  
}


export const getClass = async (
  req: TypedRequest<ClassCreateDto>, 
  res: Response, 
  next: NextFunction) => {

    const userId = (req.user as User).id!

    const classes = await fetchClass(userId)
    res.json(classes)
}