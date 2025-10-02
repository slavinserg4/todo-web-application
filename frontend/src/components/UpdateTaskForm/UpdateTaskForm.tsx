import { update } from "@/server-actions/ServerActions";
import { FC } from "react";
import { ITask } from "@/models/ITaskModel";
import "./styleForUpdateTaskForm.css"

type UpdateTaskFormProp = {
    task: ITask;
}

const UpdateTaskForm: FC<UpdateTaskFormProp> = ({ task }) => {
    const updateWithId = async (formData: FormData) => {
        'use server'
        await update(formData, task._id);
    };

    return (
        <form action={updateWithId} className="task-form">
            <h2 className="form-title">Update Task</h2>

            <div className="form-group">
                <label htmlFor="title">
                    Title (optional)
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={task.title}
                    placeholder="Enter task title"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="priority">
                    Priority (optional)
                </label>
                <select
                    id="priority"
                    name="priority"
                    defaultValue={task.priority}
                >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="description">
                    Description (optional)
                </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    defaultValue={task.description}
                    placeholder="Add task description"
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">
                    Category (optional)
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    defaultValue={task.category}
                    placeholder="Add category"
                />
            </div>

            <div className="form-group">
                <label htmlFor="dueDate">
                    Due Date (optional)
                </label>
                <input
                    type="datetime-local"
                    id="dueDate"
                    name="dueDate"
                    defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ''}
                />
            </div>

            <button type="submit" className="submit-button">
                Update
            </button>
        </form>
    );
};

export default UpdateTaskForm;