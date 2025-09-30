import { Router } from "express";

import { taskRouter } from "./task.router";

const router = Router();
router.use("/task", taskRouter);

export const apiRouter = router;
