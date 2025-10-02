import TaskDetails from "@/components/TaskDetails/TaskDetails";
import { FC } from "react";
import UpdateTaskForm from "@/components/UpdateTaskForm/UpdateTaskForm";
import { getTaskById } from "@/services/api.service";

interface TaskDetailsProp {
    params: Promise<{
        id: string;
    }>;
}

const Page: FC<TaskDetailsProp> = async ({ params }) => {
    const { id } = await params;
    const task = await getTaskById(id);

    return (
        <div>
            <TaskDetails key={id} id={id} />
            <UpdateTaskForm task={task} />
        </div>
    );
};

export default Page;