import React from 'react';
import './modal-overlay.css';

interface IModalOverlayProps {
  onCloseOverlay: () => void;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onCloseOverlay }) => {
  const closeByOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCloseOverlay();
    }
  };

  return <div onClick={closeByOverlay} className="modal__background"></div>;
};

export default ModalOverlay;
