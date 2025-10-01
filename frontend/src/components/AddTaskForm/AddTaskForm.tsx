import { createTaskAction } from "@/server-actions/ServerActions";
import "./styleForTaskForm.css"

const AddTaskForm = () => {
    return (
        <form action={createTaskAction} className="task-form">
            <h2 className="form-title">Create New Task</h2>

            <div className="form-group">
                <label htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="Enter task title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="priority">
                    Priority
                </label>
                <select
                    id="priority"
                    name="priority"
                    required
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
                    placeholder="Add category"
                />
            </div>

            <div className="form-group">
                <label htmlFor="dueDate">
                    Due date (optional)
                </label>
                <input
                    type="datetime-local"
                    id="dueDate"
                    name="dueDate"
                />
            </div>

            <button type="submit" className="submit-button">
                Add task
            </button>
        </form>
    );
};

export default AddTaskForm;