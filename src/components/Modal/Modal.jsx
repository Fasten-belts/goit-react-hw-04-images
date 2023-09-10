/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModalEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseModalEsc);
    };
  }, [handleCloseModalEsc]);

  function handleCloseModalEsc(evt) {
    if (evt.code === 'Escape') {
      onClose();
    }
  }

  function handleCloseModalClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <Overlay className="overlay" onClick={handleCloseModalClick}>
      <ModalStyled className="modal">{children}</ModalStyled>
    </Overlay>,
    modalRoot
  );
}

export { Modal };
