import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AddInput from './add-input';

const addNewTodo = jest.fn((todo) => {
  return {
    id: 1,
    todo: todo,
    isDone: false,
    date: '2022-01-01',
  };
});

const selectedDate = '2022-01-01';

describe('AddInput component tests', () => {
  it('should correctly render AddInput', () => {
    const tree = renderer
      .create(<AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should update text state when input value changes', () => {
    render(<AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />);

    const inputElement = screen.getByPlaceholderText('Добавьте новое событие');

    fireEvent.change(inputElement, { target: { value: 'Test todo' } });
    expect(inputElement).toHaveValue('Test todo');
  });

  it('should clear input text after adding todo', () => {
    render(<AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />);

    const inputElement = screen.getByPlaceholderText('Добавьте новое событие');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(inputElement, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);

    expect(inputElement).toHaveValue('');
  });

  it('should toggle focused state when input is focused and blurred', () => {
    render(<AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />);

    const inputElement = screen.getByPlaceholderText('Добавьте новое событие');

    fireEvent.focus(inputElement);
    expect(inputElement).toHaveClass('modal__input_focused');

    fireEvent.blur(inputElement);
    expect(inputElement).not.toHaveClass('modal__input_focused');
  });
});
