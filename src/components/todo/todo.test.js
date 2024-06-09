import renderer from 'react-test-renderer';
import { StoreProvider } from '../../providers/StoreProvider';

import Todo from './todo';

it('should correctly render Todo', () => {
  const task = {
    id: 123,
    todo: 'test todo',
    isDone: false,
    date: '2022-01-01',
  };
  const i = 0;

  const tree = renderer
    .create(
      <StoreProvider>
        <Todo task={task} i={i} />
      </StoreProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
