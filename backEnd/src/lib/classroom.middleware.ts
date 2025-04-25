import { Request, Response, NextFunction } from "express";
import { User } from "../api/user/user.entity";
import { classModel } from "../api/classroom/classroom.model";

export async function isInClass(
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  try {
    const classId = req.params.classId;
    const userId = (req.user as User).id;
    const classroomFound = await classModel.find({
      id: classId,
      students: userId 
    });

    if (!classroomFound) {
      res.status(404).json({ message: 'Non sei iscritto a questa classe' });
      return;
    }

    next();
  } catch (error) {
    next(error)
  }
}
