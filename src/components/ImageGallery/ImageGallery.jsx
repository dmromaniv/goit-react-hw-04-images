import { useState } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

import s from './ImageGallery.module.css';

export const ImageGallery = ({ imagesGalleryRef, images }) => {
  const [modalData, setModalData] = useState(null);

  const openModal = imgSrc => {
    setModalData(imgSrc);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <ul ref={imagesGalleryRef} className={s.imageGallery}>
        {images.map((image, index) => (
          <ImageGalleryItem key={image.id} {...image} onOpenModal={openModal} />
        ))}
      </ul>
      {modalData && <Modal imgUrl={modalData} onCloseModal={closeModal} />}
    </>
  );
};
