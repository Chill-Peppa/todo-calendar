import { render, screen, fireEvent } from '@testing-library/react';
import Day from './day';

const item = { day: 15, isHoliday: 0 };
const index = 0;
const onOpenTodo = jest.fn();
const currentMonth = 9;
const currentYear = 2023;
const checkDate = (value) => value === '2023-10-15';

it('should correctly render Day', () => {
  render(
    <Day
      item={item}
      index={index}
      onOpenTodo={onOpenTodo}
      currentMonth={currentMonth}
      currentYear={currentYear}
      checkDate={checkDate}
    />,
  );

  expect(Day).toMatchSnapshot();
});

it('should open modal with days todos', () => {
  render(
    <Day
      item={item}
      index={index}
      onOpenTodo={onOpenTodo}
      currentMonth={currentMonth}
      currentYear={currentYear}
      checkDate={checkDate}
    />,
  );

  const day = screen.getByTestId('day');
  fireEvent.click(day);

  expect(onOpenTodo).toHaveBeenCalled();
});
