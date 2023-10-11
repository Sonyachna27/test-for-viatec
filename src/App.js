import './App.css';
import AddTodoList from './components/todo/AddTodoList';
import TodoList from './components/todo/TodoList';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
function App() {
  return (
    <div className="App">
      <ThemeProvider
  breakpoints={[ 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
> 
      <TodoList />
      
      </ThemeProvider>
    </div>
  );
}

export default App;
