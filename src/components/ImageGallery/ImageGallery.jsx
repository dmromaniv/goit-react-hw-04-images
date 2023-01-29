import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

import s from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    modalData: null,
  };

  openModal = imgSrc => {
    this.setState({ modalData: imgSrc });
  };

  closeModal = () => {
    this.setState({ modalData: null });
  };

  render() {
    const { imagesGalleryRef, images } = this.props;
    return (
      <>
        <ul ref={imagesGalleryRef} className={s.imageGallery}>
          {images.map((image, index) => (
            <ImageGalleryItem
              key={image.id}
              {...image}
              onOpenModal={this.openModal}
            />
          ))}
        </ul>
        {this.state.modalData && (
          <Modal imgUrl={this.state.modalData} onCloseModal={this.closeModal} />
        )}
      </>
    );
  }
}
