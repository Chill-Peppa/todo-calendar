import React from 'react';
import renderer from 'react-test-renderer';
import Calendar from './calendar';

it('should correctly render Calendar', () => {
  const onOpenTodo = jest.fn();
  const onOpenWeekTasks = jest.fn();

  const tree = renderer
    .create(
      <Calendar onOpenTodo={onOpenTodo} onOpenWeekTasks={onOpenWeekTasks} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
