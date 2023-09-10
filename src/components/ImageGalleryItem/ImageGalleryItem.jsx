import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryPart, ImageGalleryImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
    document.body.style.overflow = showModal ? 'auto' : 'hidden';
  }

  const { largeImageURL, webformatURL, tags } = image;

  return (
    <>
      <ImageGalleryPart className="gallery-item" onClick={toggleModal}>
        <ImageGalleryImage src={webformatURL} alt={tags} />
      </ImageGalleryPart>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

export { ImageGalleryItem };
