import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, onClose }) {
  useEffect(() => {
    function handleCloseModalEsc(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleCloseModalEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseModalEsc);
    };
  }, [onClose]);

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
