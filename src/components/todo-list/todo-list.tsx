import React, { useState, useEffect } from 'react';
import './todo-list.css';
import AddInput from '../add-input/add-input';
import Todo from '../todo/todo';
import { useStore } from '../../hooks/useStore';

interface ITodoList {
  selectedDate: string;
}

const TodoList: React.FC<ITodoList> = ({ selectedDate }) => {
  const store = useStore();

  const [filteredTodoList, setFilteredTodoList] = useState<
    { id: number; todo: string; isDone: boolean; date: string }[]
  >([]);

  useEffect(() => {
    const savedTodoListString = localStorage.getItem('todoList');
    const savedTodoList = savedTodoListString
      ? JSON.parse(savedTodoListString)
      : [];
    store.setTodoList(savedTodoList);

    const savedCheckedItemsString = localStorage.getItem('checkedItems');
    const savedCheckedItems = savedCheckedItemsString
      ? JSON.parse(savedCheckedItemsString)
      : {};
    store.setCheckedItems(savedCheckedItems);
  }, []);

  const addNewTodo = (newTodo: {
    id: number;
    todo: string;
    isDone: boolean;
    date: string;
  }) => {
    const weekNumber = store.getWeekNumber(newTodo.date);

    const updatedTodo = [
      ...store.todoList,
      {
        ...newTodo,
        weekNumber: weekNumber,
      },
    ];
    store.setTodoList(updatedTodo);
    localStorage.setItem('todoList', JSON.stringify(updatedTodo));
    console.log(store.todoList);
  };

  // Функция для фильтрации задач по дате
  const filterTodoList = (date: string) => {
    const filteredList = store.todoList.filter((item) => item.date === date);
    setFilteredTodoList(filteredList);
  };

  useEffect(() => {
    filterTodoList(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, store.todoList]);

  return (
    <div className="modal__todo-container">
      <ul className="modal__todo">
        {filteredTodoList.map((task, i) => (
          <Todo task={task} key={task.id} i={i} />
        ))}
      </ul>

      <AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />
    </div>
  );
};

export default TodoList;
