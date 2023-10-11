import React, { useEffect, useState } from 'react';
import AddTodo from './Addtodo';
import Button from 'react-bootstrap/esm/Button';

const AddTodoList = () => {
    const [windowOpen, setWindowOpen] = useState(false);

    const handleBurgerClick = () => {
        setWindowOpen(!windowOpen);
    };

    const closeModal = () => {
        setWindowOpen(false);
    };

    return (
        <>
            <Button variant='success' onClick={handleBurgerClick}>Add task</Button>
            {windowOpen && <AddTodo closeModal={closeModal} windowOpen={windowOpen} handleClose={closeModal}/>}
        </>
    );
};

export default AddTodoList;
