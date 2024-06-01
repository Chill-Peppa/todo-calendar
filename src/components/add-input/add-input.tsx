import React, { useState, ChangeEvent, FC } from 'react';
import './add-input.css';

interface AddInputProps {
  addNewTodo: Function;
}

const AddInput: FC<AddInputProps> = ({ addNewTodo }) => {
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

  const handleAddTodo = () => {
    if (text !== '') {
      addNewTodo({
        id: Math.floor(Math.random() * 1000),
        todo: text,
        isDone: false,
      });
      setText('');
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
      <button
        onClick={handleAddTodo}
        type="button"
        className="modal__add-button">
        +
      </button>
    </div>
  );
};

export default AddInput;
