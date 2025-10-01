import { SortEnum } from "../enums/sort.enum";
import { TaskStatusEnum } from "../enums/task-status.enum";
import {
    ICreateTaskDTO,
    ITask,
    ITaskQuery,
    IUpdateTaskDTO,
} from "../interfaces/tast.interface";
import { Task } from "../models/task.model";

class TaskRepository {
    public getAllTasks(query: ITaskQuery): Promise<[ITask[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filter: any = {};
        if (query.search) {
            filter.title = {
                $regex: query.search,
                $options: "i",
            };
        }
        if (query.status) {
            switch (query.status) {
                case TaskStatusEnum.DONE:
                    filter.done = true;
                    break;
                case TaskStatusEnum.UNDONE:
                    filter.done = false;
                    break;
            }
        }

        const sortValue = query.sort === SortEnum.DESC ? -1 : 1;
        return Promise.all([
            Task.find(filter).limit(query.pageSize).skip(skip).sort({
                priority: sortValue,
                createdAt: -1,
            }),
            Task.countDocuments(filter),
        ]);
    }
    public createTask(task: ICreateTaskDTO): Promise<ITask> {
        return Task.create(task);
    }
    public deleteTask(id: string): Promise<void> {
        return Task.findByIdAndDelete(id);
    }
    public update(dto: IUpdateTaskDTO, id: string): Promise<ITask> {
        return Task.findByIdAndUpdate(
            id,
            { ...dto, updatedAt: new Date() },
            {
                new: true,
                runValidators: true,
            },
        );
    }
    public getTaskById(id: string): Promise<ITask> {
        return Task.findById(id);
    }
}
export const taskRepository = new TaskRepository();
