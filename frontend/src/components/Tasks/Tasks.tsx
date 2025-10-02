import { getTasks } from "@/services/api.service";
import Task from "@/components/Task/Task";
import "./styleForTasks.css";
import Pagination from "@/components/Pagination/Pagination";

interface TasksProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        sort?: 'asc' | 'desc';
        status?: 'done' | 'undone' | 'all';
    }>;
}

const Tasks = async ({ searchParams }: TasksProps) => {
    const params = await searchParams;

    const page = Number(params.page) || 1;
    const response = await getTasks({
        page,
        pageSize: 6,
        search: params.search,
        sort: params.sort,
        status: params.status
    });

    if (!response.data || response.data.length === 0) {
        return (
            <div>
                <h3 className="no-tasks">No tasks available</h3>
            </div>
        );
    }

    return (
        <div className="tasks-container">
            <div className="tasks-grid">
                {response.data.map(task => (
                    <Task key={task._id} task={task} />
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={response.totalPages}
                hasNextPage={response.nextPage}
                hasPrevPage={response.prevPage}
            />
        </div>
    );
};

export default Tasks;