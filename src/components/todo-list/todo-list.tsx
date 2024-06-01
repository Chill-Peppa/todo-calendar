import { useState } from 'react';
import { mockTodoList } from '../../utils/constants';
import './todo-list.css';
import deleteIcon from '../../assets/images/delete.svg';
import AddInput from '../add-input/add-input';

const TodoList = () => {
  const [todoList, setTodoList] =
    useState<{ id: number; todo: string; isDone: boolean }[]>(mockTodoList);

  //создаем новую таску
  const addNewTodo = (newTodo: {
    id: number;
    todo: string;
    isDone: boolean;
  }) => {
    setTodoList([...todoList, newTodo]);
    console.log(todoList);
  };

  //удаляем таску
  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  //чтобы перечеркнуть таску или наоборот
  const toggleTodo = (id: number) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
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
