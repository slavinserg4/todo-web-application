import { ITask } from "@/models/ITaskModel";
import { FC } from "react";
import { deleteTaskAction, toggleTaskAction } from "@/server-actions/ServerActions";
type TaskProps = {
    task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }


    return (
        <div className="border p-4 mb-4 rounded">
            <form action={toggleTaskAction}>
                <input type="hidden" name="taskId" value={task._id} />
                <button type="submit" className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={task.done}
                        readOnly
                        className="w-5 h-5"
                    />
                    <span className={task.done ? 'line-through text-gray-500' : ''}>
                        {task.title}
                    </span>
                </button>
            </form>

            {task.dueDate && (
                <p className="text-sm text-gray-600 mt-2">
                    Дедлайн: {formatDate(task.dueDate.toString())}
                </p>
            )}

            <div className="flex items-center justify-between mt-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Пріоритет: {task.priority}
                </span>

                <form action={deleteTaskAction}>
                    <input type="hidden" name="taskId" value={task._id} />
                    <button
                        type="submit"
                        className="text-red-500 hover:text-red-700"
                    >
                        ❌
                    </button>
                </form>
            </div>
        </div>
    );


};

export default Task;