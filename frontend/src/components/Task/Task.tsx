'use client';

import { ITask } from '@/models/ITaskModel';
import './styleForTask.css';
import { deleteTaskAction, toggleTaskStatusAction } from '@/server-actions/ServerActions';
import Link from 'next/link';

interface TaskProps {
    task: ITask;
}

const Task = ({ task }: TaskProps) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleComplete = async () => {
        await toggleTaskStatusAction(task._id);
    };

    const handleDelete = async () => {
        await deleteTaskAction(task._id);
    };

    return (
        <div className={`task-card ${task.done ? 'completed' : ''}`}>
            <div className="task-header">
                <div className="task-main-info">
                    <Link href={`/${task._id}`}>
                        <h3 className="task-title">{task.title}</h3>
                    </Link>
                    <span className="task-priority">
                        Priority: {task.priority}
                    </span>
                </div>
            </div>

            {task.description && (
                <p className="task-description">{task.description}</p>
            )}

            <div className="task-footer">
                <div className="task-info">
                    {task.category && (
                        <span className="task-category">{task.category}</span>
                    )}
                    {task.dueDate && (
                        <span className="task-due-date">
                            Due: {formatDate(task.dueDate)}
                        </span>
                    )}
                </div>

                <div className="task-actions">
                    <button
                        className="task-button complete-button"
                        onClick={handleComplete}
                    >
                        {task.done ? 'Undo' : 'Complete'}
                    </button>
                    <button
                        className="task-button delete-button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;