import React from 'react';
import renderer from 'react-test-renderer';
import Calendar from './calendar';
import { render, screen, fireEvent } from '@testing-library/react';
import { checkDate } from './calendar';
import '@testing-library/jest-dom/extend-expect';

const onOpenTodo = jest.fn();
const onOpenWeekTasks = jest.fn();

it('should correctly render Calendar', () => {
  const tree = renderer
    .create(
      <Calendar onOpenTodo={onOpenTodo} onOpenWeekTasks={onOpenWeekTasks} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should open modal with week tasks', () => {
  render(
    <Calendar onOpenTodo={onOpenTodo} onOpenWeekTasks={onOpenWeekTasks} />,
  );

  const openWeekTasksButton = screen.getByTestId('open-button');
  fireEvent.click(openWeekTasksButton);

  expect(onOpenWeekTasks).toHaveBeenCalled();
});

it('checkDate should return true if the date is found in the savedTodoList', () => {
  const date = '2022-01-01';
  localStorage.setItem(
    'todoList',
    JSON.stringify([
      { id: 1, todo: 'Do something', isDone: false, date: '2022-01-01' },
    ]),
  );

  const result = checkDate(date);

  expect(result).toBe(true);
});

it('checkDate should return false if the date is not found in the savedTodoList', () => {
  const date = '2022-01-02';
  localStorage.setItem(
    'todoList',
    JSON.stringify([
      { id: 1, todo: 'Do something', isDone: false, date: '2022-01-01' },
    ]),
  );

  const result = checkDate(date);

  expect(result).toBe(false);
});

it('onNextButtonClick updates currentMonth and currentYear correctly', () => {
  render(
    <Calendar onOpenTodo={onOpenTodo} onOpenWeekTasks={onOpenWeekTasks} />,
  );
  const nextButton = screen.getByTestId('next-button');
  fireEvent.click(nextButton);

  expect(screen.getByTestId('calendar-title')).toHaveTextContent('Июль 2024');
});

it('onPrevButtonClick updates currentMonth and currentYear correctly', () => {
  render(
    <Calendar onOpenTodo={onOpenTodo} onOpenWeekTasks={onOpenWeekTasks} />,
  );
  const nextButton = screen.getByTestId('prev-button');
  fireEvent.click(nextButton);

  expect(screen.getByTestId('calendar-title')).toHaveTextContent('Май 2024');
});
