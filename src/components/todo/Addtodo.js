import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskAdded, selectAllTasks } from '../todo/TodoSlice'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const AddTodo = ({closeModal, windowOpen, handleClose}) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');

  const states = useSelector(selectAllTasks);

  const onContentChange = (e) => setContent(e.target.value);
  const onNameChange = (e) => setName(e.target.value);

  const onSaveTaskClicked = () => {

    if (content && name && state) {
      dispatch(taskAdded(content, name, state));
      setContent('');
      setName('');
      setState('');
      closeModal();
    }
  };

  const canSave = Boolean(content) && Boolean(name) && Boolean(state);

  const onStateChange = (e) => setState(e.target.value);

  return (
    <div >
    <Modal
    show={windowOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
    <Modal.Header closeButton>
          <Modal.Title>
          <label htmlFor="taskName">Name:</label>
          <Form.Control type="text" placeholder="New task"id="taskName" value={name} onChange={onNameChange} />
          </Modal.Title>
        </Modal.Header>
    <Modal.Body>
      
        <FloatingLabel
          id="postContent"
          name="postContent"
          controlId="floatingTextarea"
          label="You need ..."
          className="mb-3"
          value={content}
          onChange={onContentChange}
        >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>

        <Form.Select aria-label="Default select example" id="tasksOptions" value={state} onChange={onStateChange}>
        
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
          variant="primary" 
          disabled={!canSave}
          onClick={onSaveTaskClicked}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTodo;