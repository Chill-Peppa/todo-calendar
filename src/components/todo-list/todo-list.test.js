import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { StoreProvider } from '../../providers/StoreProvider';
import TodoList from './todo-list';

const selectedDate = '2022-01-01';

it('should correctly render TodoList', () => {
  const tree = renderer
    .create(
      <StoreProvider>
        <TodoList selectedDate={selectedDate} />
      </StoreProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should renders message if filteredTodoList is empty', () => {
  render(
    <StoreProvider>
      <TodoList selectedDate={selectedDate} />
    </StoreProvider>,
  );
  const message = screen.getByText(
    'На этот день событий не запланировано. Добавьте ваше первое событие 🥺',
  );
  expect(message).toBeInTheDocument();
});
