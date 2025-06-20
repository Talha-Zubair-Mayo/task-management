import React, { useState } from 'react';
import Button from './Button';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskActions = ({ task, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      await onEdit(task);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(task.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-2 justify-end">
      <Button
        variant="secondary"
        className="flex items-center"
        onClick={handleEdit}
        type="button"
        disabled={loading}
      >
        <FaEdit className="mr-1" /> Edit
      </Button>
      <Button
        variant="danger"
        className="flex items-center"
        onClick={handleDelete}
        type="button"
        disabled={loading}
      >
        <FaTrash className="mr-1" /> Delete
      </Button>
    </div>
  );
};


export default TaskActions;
