import Header from '@/components/Header/Header';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';
import Tasks from "@/components/Tasks/Tasks";
import './global.css';

const HomePage = () => {
    return (
        <div className="page-container">
            <Header />

            <main className="content-container">
                <div className="grid-layout">
                    <div className="form-section">
                        <AddTaskForm />
                    </div>
                    <div className="tasks-section">
                        <Tasks/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;