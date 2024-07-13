import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    fetch('/todo.json')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    if (newTask.trim()) {
      const newTodo = { id: todos.length + 1, task: newTask, completed: false };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? currentTodo : todo
      )
    );
    setIsEditing(false);
    setCurrentTodo({});
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, task: e.target.value });
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Todo List</h1>
      <Row className="mb-4">
        <Col>
          <InputGroup>
            <FormControl
              type="text"
              value={ isEditing ? currentTodo.task : newTask}
              onChange={(e) => isEditing ? handleEditInputChange(e) : setNewTask(e.target.value)}
              placeholder="New task"
            />
            <Button variant="primary" onClick={isEditing ? updateTodo : addTodo}>
              {isEditing ? 'Update Task' : 'Add Task'}
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {todos.map((todo) => (
          <Col key={todo.id} xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.task}
                </Card.Title>
                <Button variant="success" onClick={() => toggleCompletion(todo.id)} className="me-2">
                  {todo.completed ? 'Undo' : 'Complete'}
                </Button>
                <Button variant="warning" onClick={() => editTodo(todo)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
