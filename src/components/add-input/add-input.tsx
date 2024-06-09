import React, { useState, ChangeEvent, FC } from 'react';
import './add-input.css';

interface AddInputProps {
  addNewTodo: Function;
  selectedDate: string;
}

const AddInput: FC<AddInputProps> = ({ addNewTodo, selectedDate }) => {
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
        id: Math.floor(Math.random() * 1000), //для генерации случайного айди (можно uuid использовать)
        todo: text,
        isDone: false,
        date: selectedDate,
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
        data-testid="text"
        value={text}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Добавьте новое событие"
      />
      <button
        onClick={handleAddTodo}
        data-testid="add-button"
        type="button"
        className="modal__add-button">
        +
      </button>
    </div>
  );
};

export default AddInput;
