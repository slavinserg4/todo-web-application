import { SortEnum } from "../enums/sort.enum";
import { IBase } from "./base.interface";

export interface ITask extends IBase {
    _id: string;
    title: string;
    description?: string;
    done: boolean;
    priority: number;
    dueDate?: Date;
    category?: string;
}
export interface ICreateTaskDTO {
    title: string;
    priority: number;
    description?: string;
    dueDate?: Date;
    category?: string;
}
export interface IUpdateTaskDTO {
    title?: string;
    priority?: number;
    done?: boolean;
    description?: string;
    dueDate?: Date;
    category?: string;
}
export interface ITaskQuery {
    pageSize: number;
    page: number;
    sort?: SortEnum;
    search?: string;
    done?: boolean;
}
