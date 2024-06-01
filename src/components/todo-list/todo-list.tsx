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

  return (
    <>
      <ul className="modal__todo">
        {todoList.map((item, i) => (
          <li key={item.id} className="modal__deal">
            {`${i + 1}. ${item.todo}`}
            <div className="modal__checkbox-container">
              <input
                className="modal__checkbox"
                type="checkbox"
                id={`checkboxid-${i}`}
              />
              <label
                className="modal__label"
                htmlFor={`checkboxid-${i}`}></label>
              <img
                alt="delete"
                src={deleteIcon}
                className="modal__delete-deal"
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
