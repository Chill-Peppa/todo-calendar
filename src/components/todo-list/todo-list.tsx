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

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {},
  );

  console.log('объект с состоянием чекбокса:', checkedItems);

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
    console.log('Наш массив со всеми данными:', updatedTodo);
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
                checked={checkedItems[item.id]}
                onChange={() => toggleTodo(item.id)}
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
