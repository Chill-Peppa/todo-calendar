import { render, fireEvent, screen } from '@testing-library/react';
import ModalOverlay from './modal-overlay';

it('closes the modal overlay when clicked outside the content', () => {
  const onCloseOverlay = jest.fn();
  render(<ModalOverlay onCloseOverlay={onCloseOverlay} />);
  const modalBackground = screen.getByTestId('modal-background');

  fireEvent.click(modalBackground);

  expect(onCloseOverlay).toHaveBeenCalled();
});
