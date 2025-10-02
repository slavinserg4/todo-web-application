import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IPaginatedResponse } from "../interfaces/paginated.-response.interface";
import {
    ICreateTaskDTO,
    ITask,
    ITaskQuery,
    IUpdateTaskDTO,
} from "../interfaces/tast.interface";
import { taskRepository } from "../repositories/task.repository";

dayjs.extend(customParseFormat);

class TaskService {
    private parseDateString(dateStr: string): Date | undefined {
        if (!dateStr) return undefined;

        const parsedDate = dayjs(dateStr, "DD.MM.YYYY HH:mm");

        if (parsedDate.isValid()) {
            return parsedDate.toDate();
        }

        const isoDate = new Date(dateStr);
        if (!isNaN(isoDate.getTime())) {
            return isoDate;
        }

        throw new ApiError(
            "Invalid date format. Use DD.MM.YYYY HH:mm or ISO format",
            StatusCodesEnum.BAD_REQUEST,
        );
    }
    private validateAndParseDates(dto: any): any {
        return {
            ...dto,
            dueDate: dto.dueDate
                ? this.parseDateString(dto.dueDate)
                : undefined,
        };
    }

    public async getTasks(
        query: ITaskQuery,
    ): Promise<IPaginatedResponse<ITask>> {
        const [data, totalItems] = await taskRepository.getAllTasks(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);
        const currentPage = query.page || 1;
        return {
            totalItems,
            totalPages,
            prevPage: currentPage > 1,
            nextPage: currentPage < totalPages,
            data,
        };
    }
    public async createTask(dto: ICreateTaskDTO): Promise<ITask> {
        const parsedData = this.validateAndParseDates(dto);
        return await taskRepository.createTask(parsedData);
    }

    public async updateTask(id: string, dto: IUpdateTaskDTO): Promise<ITask> {
        await this.getTaskById(id);
        const parsedData = this.validateAndParseDates(dto);
        return await taskRepository.update(parsedData, id);
    }

    public async deleteTask(id: string): Promise<void> {
        await this.getTaskById(id);
        await taskRepository.deleteTask(id);
    }

    public async toggleTaskStatus(id: string): Promise<ITask> {
        const task = await this.getTaskById(id);
        return await this.updateTask(id, {
            done: !task.done,
        });
    }
    public async getTaskById(id: string): Promise<ITask> {
        const task = await taskRepository.getTaskById(id);
        if (!task) {
            throw new ApiError("Task not found", StatusCodesEnum.NOT_FOUND);
        }
        return task;
    }
}
export const taskService = new TaskService();
