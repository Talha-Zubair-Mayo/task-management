import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTaskStore } from '../store/taskStore';
import TaskFormModal from '../components/TaskFormModal';
import TaskTable from '../components/TaskTable';
import SectionHeader from '../components/SectionHeader';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';

const TaskList = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const { tasks, fetchTasks, deleteTask, loading } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error deleting task');
        }
    };

    const handleEditClick = (task) => {
        setTaskToEdit(task);
        setModalOpen(true);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <SectionHeader
                    title="Tasks"
                    description="A list of all your tasks and their current status."
                />
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Button
                        onClick={() => setModalOpen(true)}
                        variant="contained"
                        color="primary"
                    >
                        Create New Task
                    </Button>
                </div>
            </div>

            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        {tasks.length === 0 && !loading ? (
                            <EmptyState message="No tasks found. Create your first task!" />
                        ) : (
                            <TaskTable tasks={tasks} onEdit={handleEditClick} onDelete={handleDelete} />
                        )}
                    </div>
                </div>
            </div>

            <TaskFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false)
                    setTaskToEdit(null)
                }}
                taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default TaskList;
