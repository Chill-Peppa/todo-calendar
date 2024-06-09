import React from 'react';
import renderer from 'react-test-renderer';

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

it('should correctly render AddInput', () => {
  const tree = renderer
    .create(<AddInput addNewTodo={addNewTodo} selectedDate={selectedDate} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
