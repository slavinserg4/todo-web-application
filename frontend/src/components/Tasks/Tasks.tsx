import { getTasks } from "@/services/api.service";
import Task from "@/components/Task/Task";

const Tasks = async () => {
    const response = await getTasks();

    if (!response.data || response.data.length === 0) {
        return (
            <div>
                No tasks available
            </div>
        );
    }

    return (
        <div>
            {response.data.map(task => (
                <Task key={task._id} task={task} />
            ))}
        </div>
    );
};

export default Tasks;