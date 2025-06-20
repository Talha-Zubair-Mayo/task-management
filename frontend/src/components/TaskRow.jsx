import React from 'react';
import TaskActions from './TaskActions';
import StatusLabel from './StatusLabel';

const TaskRow = ({ task, onEdit, onDelete }) => (
    <tr key={task.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
            {task.title}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {task.description}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm">
            <StatusLabel status={task.status} />
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-2 text-right text-sm font-medium sm:pr-6">
            <TaskActions task={task} onEdit={onEdit} onDelete={onDelete} />
        </td>
    </tr>
);

export default TaskRow;
