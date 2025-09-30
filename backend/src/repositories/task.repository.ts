import { SortEnum } from "../enums/sort.enum";
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
        if (query.done !== undefined) {
            filter.done = query.done;
        }
        const sortValue = query.sort === SortEnum.DESC ? -1 : 1;
        console.log("query in repo =", query);
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
