import React from 'react';
import { Formik, Form } from 'formik';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ModalFooter from './ModalFooter';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

import { useTaskStore } from '../store/taskStore';

const taskSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
});

const TaskFormModal = ({ isOpen, onClose, taskToEdit }) => {
    const { createTask, updateTask } = useTaskStore();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (taskToEdit) {
                await updateTask(taskToEdit.id, values);
                toast.success('Task updated successfully');
            } else {
                await createTask(values);
                toast.success('Task created successfully');
            }
            resetForm();
            onClose(); 
        } catch (error) {
            toast.error('Error saving task');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{taskToEdit ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        title: taskToEdit ? taskToEdit.title : '',
                        description: taskToEdit ? taskToEdit.description : '',
                        status: taskToEdit ? taskToEdit.status : 'pending',
                    }}
                    validationSchema={taskSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="space-y-6">
                                <FormInput
                                    label="Title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter task title"
                                />
                                <FormInput
                                    label="Description"
                                    name="description"
                                    type="textarea"
                                    placeholder="Enter task description"
                                />
                                <FormSelect
                                    label="Status"
                                    name="status"
                                    options={[
                                        { value: 'pending', label: 'Pending' },
                                        { value: 'in_progress', label: 'In Progress' },
                                        { value: 'completed', label: 'Completed' },
                                    ]}
                                />
                            </div>
                            <ModalFooter
                                onCancel={onClose}
                                isSubmitting={isSubmitting}
                                submitLabel={taskToEdit ? 'Save Changes' : 'Create Task'}
                            />
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default TaskFormModal;
