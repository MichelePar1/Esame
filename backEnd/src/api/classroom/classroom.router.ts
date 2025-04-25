import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { createClass, getClass } from "./classroom.controller";
import { isTeacher } from "../../lib/teacher.middleware";
import { assigmentDto } from "../assigments/assigment.dto";
import { validate } from "../../lib/validation-middleware";
import { isInClass } from "../../lib/classroom.middleware";

const router = Router();

const assignmentsController = require('../assigments/assigments.controller');

router.use(isAuthenticated)
router.post('/', isTeacher, createClass );
router.get('/', getClass)
router.post('/:classId/assigments', validate(assigmentDto), isTeacher, assignmentsController.createAssigment)
router.get('/:classId/assigments', isInClass, assignmentsController.listAssigments)

export default router;