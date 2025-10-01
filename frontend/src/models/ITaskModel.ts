export interface ITask {
    _id: string;
    title: string;
    description?: string;
    done: boolean;
    priority: number;
    dueDate?: Date;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
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
    sort?: "asc" | "desc";
    search?: string;
    status?: "done" | "undone" | "all";
}

export interface ITaskResponse {
    data: ITask[];
    totalItems: number;
    totalPages: number;
    prevPage: boolean;
    nextPage: boolean;
}