import React, { useState, ChangeEvent, FC } from 'react';
import './add-input.css';

interface AddInputProps {
  todoList: string[];
  setTodoList: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddInput: FC<AddInputProps> = ({ todoList, setTodoList }) => {
  const [text, setText] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

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
  return (
    <div className="modal__add-container">
      <input
        className={
          focused || text ? 'modal__input modal__input_focused' : 'modal__input'
        }
        type="text"
        id="add-input"
        value={text}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Добавьте новое событие"
      />
      <button type="button" onClick={addNewDeal} className="modal__add-button">
        +
      </button>
    </div>
  );
};

export default AddInput;
