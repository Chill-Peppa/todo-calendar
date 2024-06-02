import React, { useState, useEffect } from 'react';
import './todo-list.css';
import deleteIcon from '../../assets/images/delete.svg';
import AddInput from '../add-input/add-input';

interface ITodoList {
  selectedDate: string;
}

const TodoList: React.FC<ITodoList> = ({ selectedDate }) => {
  const [todoList, setTodoList] = useState<
    { id: number; todo: string; isDone: boolean; date: string }[]
  >([]);

  const [filteredTodoList, setFilteredTodoList] = useState<
    { id: number; todo: string; isDone: boolean; date: string }[]
  >([]);

  //при монтировании получаю данные из стореджа
  useEffect(() => {
    const savedTodoListString = localStorage.getItem('todoList');
    const savedTodoList = savedTodoListString
      ? JSON.parse(savedTodoListString)
      : [];
    setTodoList(savedTodoList);
  }, []);

  const addNewTodo = (newTodo: {
    id: number;
    todo: string;
    isDone: boolean;
    date: string;
  }) => {
    const updateTodo = [...todoList, newTodo];
    setTodoList(updateTodo);
    localStorage.setItem('todoList', JSON.stringify(updateTodo));
    console.log(updateTodo);
  };

  const deleteTodo = (id: number) => {
    const updateTodo = todoList.filter((item) => item.id !== id);
    setTodoList(updateTodo);
    localStorage.setItem('todoList', JSON.stringify(updateTodo));
  };

  const toggleTodo = (id: number) => {
    const updateTodo = todoList.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item,
    );
    setTodoList(updateTodo);
    localStorage.setItem('todoList', JSON.stringify(updateTodo));
  };

  // Функция для фильтрации задач по дате
  const filterTodoList = (date: string) => {
    const filteredList = todoList.filter((item) => item.date === date);
    setFilteredTodoList(filteredList);
  };

  // Вызов функции фильтрации при изменении выбранной даты
  useEffect(() => {
    filterTodoList(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, todoList]);

  return (
    <>
      <ul className="modal__todo">
        {filteredTodoList.map((item, i) => (
          <li
            key={item.id}
            className={
              item.isDone
                ? 'modal__deal modal__deal_strikethrough'
                : 'modal__deal'
            }>
            {`${i + 1}. ${item.todo}`}
            <div className="modal__checkbox-container">
              <input
                className="modal__checkbox"
                type="checkbox"
                onClick={() => toggleTodo(item.id)}
                id={`checkboxid-${item.id}`}
              />

              <label
                className="modal__label"
                htmlFor={`checkboxid-${item.id}`}></label>

              <img
                alt="delete"
                src={deleteIcon}
                className="modal__delete-deal"
                onClick={() => deleteTodo(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />
    </>
  );
};

export default TodoList;
