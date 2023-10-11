import React, { useState } from 'react';
import EditTaskForm from './EditTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTasks, taskUpdated } from './TodoSlice';
import Button from 'react-bootstrap/esm/Button';
import Stack from 'react-bootstrap/esm/Stack';

const RenderTask = ({ id }) => {
    const tasks = useSelector(selectAllTasks);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const onTaskChange = () => {
        setIsEditing(!isEditing);
    };

    const onSaveChanges = (editedTask) => {
        const taskIndex = tasks.findIndex((task) => task.id === id);

        if (taskIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[taskIndex] = editedTask;
            dispatch(taskUpdated({ id, ...editedTask }));
        }
        setIsEditing(false);
    };
     const closeModalChange = () => {
        setIsEditing(false);
    };

    return (
        <>
            
                {isEditing ? (
                    <EditTaskForm 
                    isEditing={isEditing}
                    handleClose={onTaskChange}
                        task={tasks.find((task) => task.id === id)}
                        onSaveChanges={onSaveChanges}
                    />
                ) : (
                    <Button variant='success' onClick={onTaskChange}>Change task</Button>
                )}
            
        </>
    );
};
export default RenderTask;