import { useEffect } from 'react';

import { disableScroll, enableScroll } from 'utils/utils';
import s from './Modal.module.css';

export const Modal = ({ imgUrl, onCloseModal }) => {
  useEffect(() => {
    const closeModalByEscape = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    disableScroll();
    document.addEventListener('keydown', closeModalByEscape);

    return () => {
      enableScroll();
      document.removeEventListener('keydown', closeModalByEscape);
    };
  }, [onCloseModal]);

  return (
    <div
      className={s.overlay}
      onClick={event => event.currentTarget === event.target && onCloseModal()}
    >
      <div className={s.modal}>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  );
};
