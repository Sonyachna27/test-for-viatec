import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const EditTaskForm = ({ task, onSaveChanges, isEditing, handleClose }) => {
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveClick = () => {
        onSaveChanges(editedTask);
    };

    return (
        <div className='render'>
            <Modal 
            show={isEditing} 
            onHide={handleClose} 
            backdrop="static"
             keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FloatingLabel controlId="floatingInputGrid">Name:</FloatingLabel>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedTask.name}
                            onChange={handleInputChange}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel 
                    
                    controlId="floatingTextarea" className="mb-3">
                        <Form.Control
                            as="textarea"
                            name="content"
                            value={editedTask.content}
                            onChange={handleInputChange}
                        />
                    </FloatingLabel>
                    <Form.Select
                        aria-label="Default select example"
                        id="tasksOptions"
                        value={editedTask.state}
                        name="state"
                        onChange={handleInputChange}
                    >
                        <option value="Done">Done</option>
                        <option value="To do">To do</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    variant="secondary" 
                    onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                     variant='success' 
                     onClick={handleSaveClick}>
                     Save
                     </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditTaskForm;