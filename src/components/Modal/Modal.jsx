import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalEsc);
  }

  handleCloseModalEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseModalClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    const onClick = this.handleCloseModalClick;

    return createPortal(
      <Overlay className="overlay" onClick={onClick}>
        <ModalStyled className="modal">{children}</ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
