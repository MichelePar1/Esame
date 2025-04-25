import { validationHandler } from './validation';
import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found.error";
import { queryNotRightHandler } from './Query.error';
import { userNotProfHandler } from './not-prof.error';
import { ClassRoomNotFoundErrorHandler } from './classRoom-not-found.error';
import { wrongClassroomErrorHandler } from './wrongClass.error';

export const errorHandlers = [validationHandler, notFoundHandler, 
    queryNotRightHandler,userNotProfHandler, ClassRoomNotFoundErrorHandler,wrongClassroomErrorHandler,
    genericHandler];