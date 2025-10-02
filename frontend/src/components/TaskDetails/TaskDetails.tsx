import { FC } from "react";
import { getTaskById } from "@/services/api.service";
import "./styleForTaskDetails.css";
import Link from "next/link";

type TaskDetailsProp = {
    id: string;
}

const TaskDetails: FC<TaskDetailsProp> = async ({ id }) => {
    const task = await getTaskById(id);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="task-details">
            <div className="task-header">
                <Link href="/" className="back-button">
                    ← Back
                </Link>
                <h2>Task Details</h2>
                <div></div>
            </div>
            <div className="task-details-content">
                <div className="detail-item">
                    <span className="label">Title:</span>
                    <span className="value">{task.title}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Status:</span>
                    <span className={`value status ${task.done ? 'completed' : 'pending'}`}>
                        {task.done ? 'Completed' : 'In Progress'}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="label">Priority:</span>
                    <span className="value">{task.priority}</span>
                </div>
                {task.description && (
                    <div className="detail-item">
                        <span className="label">Description:</span>
                        <span className="value">{task.description}</span>
                    </div>
                )}
                {task.category && (
                    <div className="detail-item">
                        <span className="label">Category:</span>
                        <span className="value">{task.category}</span>
                    </div>
                )}
                {task.dueDate && (
                    <div className="detail-item">
                        <span className="label">Due Date:</span>
                        <span className="value">{formatDate(task.dueDate)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetails;