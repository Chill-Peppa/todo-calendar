import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import close from '../../assets/images/close.svg';

import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

interface IModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Запланированные события</h2>
          <button onClick={onClose} type="button" className="modal__close">
            <img
              src={close as unknown as string}
              alt="close icon"
              className="modal__close-icon"
            />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onCloseOverlay={onClose} />
    </>,
    modalRoot,
  );
};

export default Modal;
