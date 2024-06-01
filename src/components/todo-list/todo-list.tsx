import { useState } from 'react';
import { mockTodoList } from '../../utils/constants';
import './todo-list.css';
import deleteIcon from '../../assets/images/delete.svg';
import AddInput from '../add-input/add-input';

const TodoList = () => {
  const [todoList, setTodoList] = useState<string[]>(mockTodoList);

  const handleDeleteDeal = (index: number) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    setTodoList(newList);
  };

  const handleToggleComplete = (index: number) => {
    const newList = [...todoList];
    newList[index] = newList[index] + ' - Завершено';
    setTodoList(newList);
  };

  return (
    <>
      <ul className="modal__todo">
        {todoList.map((deal, i) => (
          <li key={i} className="modal__deal">
            <span>{`${i + 1}. ${deal}`}</span>

            <div className="modal__checkbox-container">
              <input
                className="modal__checkbox"
                type="checkbox"
                id="checkboxid"
                onChange={() => handleToggleComplete(i)}
              />
              <label className="modal__label" htmlFor="checkboxid"></label>
              <img
                onClick={() => handleDeleteDeal(i)}
                alt="delete"
                src={deleteIcon}
                className="modal__delete-deal"
              />
            </div>
          </li>
        ))}
      </ul>

      <AddInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
};

export default TodoList;
