import React, { useState, useEffect } from 'react';
import './todo-list.css';
import AddInput from '../add-input/add-input';
import Todo from '../todo/todo';
//import { useStore } from '../../hooks/useStore';

interface ITodoList {
  selectedDate: string;
}

const TodoList: React.FC<ITodoList> = ({ selectedDate }) => {
  // const store = useStore();

  const [todoList, setTodoList] = useState<
    { id: number; todo: string; isDone: boolean; date: string }[]
  >([]);

  const [filteredTodoList, setFilteredTodoList] = useState<
    { id: number; todo: string; isDone: boolean; date: string }[]
  >([]);

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {},
  );

  useEffect(() => {
    const savedTodoListString = localStorage.getItem('todoList');
    const savedTodoList = savedTodoListString
      ? JSON.parse(savedTodoListString)
      : [];
    setTodoList(savedTodoList);

    const savedCheckedItemsString = localStorage.getItem('checkedItems');
    const savedCheckedItems = savedCheckedItemsString
      ? JSON.parse(savedCheckedItemsString)
      : {};
    setCheckedItems(savedCheckedItems);
  }, []);

  const addNewTodo = (newTodo: {
    id: number;
    todo: string;
    isDone: boolean;
    date: string;
  }) => {
    const updatedTodo = [...todoList, newTodo];
    setTodoList(updatedTodo);
    localStorage.setItem('todoList', JSON.stringify(updatedTodo));
  };

  const deleteTodo = (id: number) => {
    const updatedTodo = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodo);
    localStorage.setItem('todoList', JSON.stringify(updatedTodo));
  };

  const toggleTodo = (id: number) => {
    const updatedTodo = todoList.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item,
    );
    setTodoList(updatedTodo);
    localStorage.setItem('todoList', JSON.stringify(updatedTodo));

    const updatedCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updatedCheckedItems);
    localStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
  };

  // Функция для фильтрации задач по дате
  const filterTodoList = (date: string) => {
    const filteredList = todoList.filter((item) => item.date === date);
    setFilteredTodoList(filteredList);
  };

  useEffect(() => {
    filterTodoList(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, todoList]);

  return (
    <div className="modal__todo-container">
      <ul className="modal__todo">
        {filteredTodoList.map((task, i) => (
          <Todo
            task={task}
            i={i}
            checkedItems={checkedItems}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>

      <AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />
    </div>
  );
};

export default TodoList;
