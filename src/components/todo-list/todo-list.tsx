import { useState, useEffect } from 'react';
//import { mockTodoList } from '../../utils/constants';
import './todo-list.css';
import deleteIcon from '../../assets/images/delete.svg';
import AddInput from '../add-input/add-input';

const TodoList = () => {
  const [todoList, setTodoList] = useState<
    { id: number; todo: string; isDone: boolean }[]
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

  return (
    <>
      <ul className="modal__todo">
        {todoList.map((item, i) => (
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

      <AddInput addNewTodo={addNewTodo} />
    </>
  );
};

export default TodoList;
