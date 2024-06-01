import { useState, ChangeEvent } from 'react';
import { mockTodoList } from '../../utils/constants';
import './todo-list.css';
import deleteIcon from '../../assets/images/delete.svg';

const TodoList = () => {
  const [text, setText] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<string[]>(mockTodoList);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (text === '') {
      setFocused(false);
    }
  };

  const addNewDeal = () => {
    if (text) {
      setTodoList([...todoList, text]);
    }
  };

  const handleDeleteDeal = (index: number) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    setTodoList(newList);
  };

  return (
    <>
      <ul className="modal__todo">
        {todoList.map((deal, i) => (
          <li key={i} className="modal__deal">
            {`${i + 1}. ${deal}`}
            <img
              onClick={() => handleDeleteDeal(i)}
              alt="delete"
              src={deleteIcon}
              className="modal__delete-deal"
            />
          </li>
        ))}
      </ul>

      <div className="modal__add-container">
        <input
          className={
            focused || text
              ? 'modal__input modal__input_focused'
              : 'modal__input'
          }
          type="text"
          id="add-input"
          value={text}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Добавьте новое событие"
        />
        <button
          type="button"
          onClick={addNewDeal}
          className="modal__add-button">
          +
        </button>
      </div>
    </>
  );
};

export default TodoList;
