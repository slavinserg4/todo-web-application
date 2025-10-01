import { ICreateTaskDTO, ITask, ITaskQuery, ITaskResponse } from "@/models/ITaskModel";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async (query?: ITaskQuery): Promise<ITaskResponse> => {
    if (!query) {
        return await fetch(`${BASE_URL}`).then(res => res.json());
    }

    const queryParams = new URLSearchParams({
        page: query.page?.toString() || '1',
        pageSize: '6',
        ...(query.sort && { sort: query.sort }),
        ...(query.search && { search: query.search }),
        ...(query.status && { status: query.status }),
    });
    return await fetch(`${BASE_URL}?${queryParams}`).then(res => res.json());
};
export const getTaskById = async (id: string): Promise<ITask> => {
    return await fetch(`${BASE_URL}/${id}`).then(res => res.json());
}
export const createTask = async (data: ICreateTaskDTO): Promise<ITaskResponse> => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const updateTask = async (data: ICreateTaskDTO, id: string): Promise<ITaskResponse> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
};

export const toggleTaskStatus = async (id: string): Promise<void> => {
    await fetch(`${BASE_URL}/${id}/toggle`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
    });
};