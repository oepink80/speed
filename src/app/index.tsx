// App.tsx

import { memo, useCallback, useMemo, useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem = memo(
  ({
    text,
    completed,
    onClick,
  }: {
    text: string;
    completed: boolean;
    onClick: () => void;
  }) => {
    // Симулируем тяжелое вычисление
    const heavyComputation = () => {
      let sum = 0;
      for (let i = 0; i < 10000000; i++) sum += i;
      return sum;
    };

    useMemo(() => heavyComputation(), []); // Вычисляем каждый рендер компонента

    return (
      <li
        onClick={onClick}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      >
        {text}
      </li>
    );
  },
);


function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Fix performance', completed: false },
  ]);
  const [input, setInput] = useState<string>('');

  const toggleTodo = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);


  const addTodo = useCallback(() => {
    if (!input.trim()) return; // Проверяем пустоту строки
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput('');
  }, [input]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onClick={() => toggleTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
