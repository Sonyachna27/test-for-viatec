import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTasks, taskUpdated, taskUpdatedState, taskDeleted } from './TodoSlice';
import RenderTask from './RenderTask';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddTodoList from './AddTodoList';
const TodoList = () => {
    const tasks = useSelector(selectAllTasks);
    const dispatch = useDispatch();
    const [doneFilter, setDoneFilter] = useState(false);
    const [todoFilter, setTodoFilter] = useState(false);

    const handleSaveChanges = (editedTask) => {
        dispatch(taskUpdated({ id: editedTask.id, ...editedTask }));
    };

    const onStateChange = (e, taskId) => {
        const newState = e.target.value;
        dispatch(taskUpdatedState({ id: taskId, state: newState }));
    };
    const onDeleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    const filteredTasks = tasks.filter((task) => {
        if ((!doneFilter && !todoFilter) || (doneFilter && todoFilter)) {
            return true;
        }
        if (doneFilter && task.state === 'Done') {
            return true;
        }
        if (todoFilter && task.state === 'To do') {
            return true;
        }
        return false;
    });

    return (
        <section>
        <Stack className='container-md' gap={5}>
<Container className='top'>
                <Row className="justify-content-md-center" xs={2} md={4} lg={6}>
                <Col className='center'>
                <Form.Check
                    inline
                    label="Done"
                    name="group1"
                    type={"checkbox"}
                    className=' checkbox' 
                    id={`inline-${"checkbox"}-1`}
                        onChange={() => setDoneFilter(!doneFilter)}
                    />
            </Col>
            <Col className='center'>

                    <Form.Check
            inline
            label="To do"
            name="group1"
            type={"checkbox"}
            className=' checkbox'
            id={`inline-${"checkbox"}-1`}
                        onChange={() => setTodoFilter(!todoFilter)}
                    />
                    </Col>
                    <Col className='center'>
                    <AddTodoList />
                    </Col>
                    
                </Row>
                </Container>
            {filteredTasks.map((task) => (
                <Container className='top'>
                
                    <Row className='center'>
                    <Col>
                    <p  >{task.name}</p>
                    </Col>
                    <Col>
                    <p >{task.content}</p>
                    </Col>
                    <Col>
                    <Form.Select size="sm" aria-label="Default select example"
                        id="tasksOptions"
                        value={task.state}
                        onChange={(e) => onStateChange(e, task.id)}
                    >
                        <option value="Done">Done</option>
                        <option value="To do">To do</option>
                    </Form.Select>
                    </Col>
                    
                    <Col>
                    <Stack gap={2} className="col-sm ">
                    <RenderTask id={task.id} />
                    <Button variant="danger" onClick={() => onDeleteTask(task.id)}>Delete</Button>
                    </Stack>
                    </Col>
                    
                    </Row>
                    
                    
                </Container>
            ))}
            </Stack>
        </section>
    );
};

export default TodoList;
