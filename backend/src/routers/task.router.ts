import { Router } from "express";

import { taskController } from "../controllers/task.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { TaskValidator } from "../validators/task.validators";

const router = Router();

router.get(
    "/",
    commonMiddleware.query(TaskValidator.queryTasks),
    taskController.getTasks.bind(taskController),
);

router.post(
    "/",
    commonMiddleware.validateBody(TaskValidator.createTask),
    taskController.createTask.bind(taskController),
);

router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    taskController.deleteTask.bind(taskController),
);

router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(TaskValidator.updateTask),
    taskController.updateTask.bind(taskController),
);

router.patch(
    "/:id/toggle",
    commonMiddleware.isIdValidate("id"),
    taskController.toggleTaskStatus.bind(taskController),
);

export const taskRouter = router;
