import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryPart, ImageGalleryImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      image: { largeImageURL, webformatURL, tags },
    } = this.props;
    const { showModal } = this.state;
    const openModal = this.toggleModal;

    showModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');

    return (
      <>
        <ImageGalleryPart className="gallery-item" onClick={openModal}>
          <ImageGalleryImage src={webformatURL} alt={tags} />
        </ImageGalleryPart>
        {showModal && (
          <Modal onClose={openModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
