'use server'

import { revalidatePath } from "next/cache";
import { ICreateTaskDTO } from "@/models/ITaskModel";
import { createTask, deleteTask, toggleTaskStatus, updateTask } from "@/services/api.service";

function parseTaskData(formData: FormData): ICreateTaskDTO {
    return {
        title: formData.get('title') as string,
        priority: parseInt(formData.get('priority') as string),
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        dueDate: formData.get('dueDate') ? new Date(formData.get('dueDate') as string) : undefined
    };
}

export async function createTaskAction(formData: FormData) {
    const taskData = parseTaskData(formData);
    await createTask(taskData);
    revalidatePath('/');
}

export async function update(formData: FormData, id: string) {
    const taskData = parseTaskData(formData);
    await updateTask(taskData, id);
    revalidatePath('/');
}
export async function toggleTaskAction(formData: FormData) {
    const id = formData.get('taskId') as string;
    await toggleTaskStatus(id);
    revalidatePath('/');
}

export async function deleteTaskAction(formData: FormData) {
    const id = formData.get('taskId') as string;
    await deleteTask(id);
    revalidatePath('/');
}


