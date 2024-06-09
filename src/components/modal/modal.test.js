import renderer from 'react-test-renderer';
import Modal from './modal';

import { render, screen, fireEvent } from '@testing-library/react';

//мокаем работу createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children) => children,
}));

const onClose = jest.fn();
const title = 'test title';
const ChildComponent = () => <div>Child Component</div>;

it('should correctly render Modal', () => {
  const tree = renderer
    .create(
      <Modal onClose={onClose} title={title}>
        <ChildComponent />
      </Modal>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should close modal', () => {
  render(
    <Modal onClose={onClose} title={title}>
      <ChildComponent />
    </Modal>,
  );

  const closeModalButton = screen.getByTestId('close-modal');
  fireEvent.click(closeModalButton);

  expect(onClose).toHaveBeenCalled();
});
