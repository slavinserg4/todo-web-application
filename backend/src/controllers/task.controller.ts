import { NextFunction, Request, Response } from "express";

import { SortEnum } from "../enums/sort.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { ITaskQuery } from "../interfaces/tast.interface";
import { taskService } from "../services/task.service";

class TaskController {
    public async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const query: ITaskQuery = {
                page: Number(req.query.page) || 1,
                pageSize: Number(req.query.pageSize) || 10,
                sort:
                    req.query.sort === "desc"
                        ? SortEnum.DESC
                        : req.query.sort === "asc"
                          ? SortEnum.ASC
                          : undefined,
                search: req.query.search?.toString(),
                status:
                    (req.query.status as TaskStatusEnum) || TaskStatusEnum.ALL,
            };
            const tasks = await taskService.getTasks(query);
            res.status(StatusCodesEnum.OK).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    public async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const newTask = await taskService.createTask(req.body);
            res.status(StatusCodesEnum.CREATED).json(newTask);
        } catch (error) {
            next(error);
        }
    }

    public async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updatedTask = await taskService.updateTask(id, req.body);
            res.status(StatusCodesEnum.OK).json(updatedTask);
        } catch (error) {
            next(error);
        }
    }

    public async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await taskService.deleteTask(id);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (error) {
            next(error);
        }
    }

    public async toggleTaskStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const updatedTask = await taskService.toggleTaskStatus(id);
            res.status(StatusCodesEnum.OK).json(updatedTask);
        } catch (error) {
            next(error);
        }
    }
    public async getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const task = await taskService.getTaskById(id);
            res.status(StatusCodesEnum.OK).json(task);
        } catch (error) {
            next(error);
        }
    }
}

export const taskController = new TaskController();
