import renderer from 'react-test-renderer';
import Modal from './modal';

//мокаем работу createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children) => children,
}));

it('should correctly render Modal', () => {
  const onClose = jest.fn();
  const title = 'test title';
  const ChildComponent = () => <div>Child Component</div>;

  const tree = renderer
    .create(
      <Modal onClose={onClose} title={title}>
        <ChildComponent />
      </Modal>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
