import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) => {
  const handleClickToOpenModal = () => {
    onOpenModal(largeImageURL);
  };

  return (
    <li className={s.imageGalleryItem} onClick={handleClickToOpenModal}>
      <img className={s.image} src={webformatURL} alt={tags} />
    </li>
  );
};
