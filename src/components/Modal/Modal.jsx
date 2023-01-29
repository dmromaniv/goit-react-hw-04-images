import { useEffect, useCallback } from 'react';

import { disableScroll, enableScroll } from 'utils/utils';
import s from './Modal.module.css';

export const Modal = ({ imgUrl, onCloseModal }) => {
  const closeModalByEscape = useCallback(e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  }, []);

  useEffect(() => {
    disableScroll();
    document.addEventListener('keydown', closeModalByEscape);
  }, []);

  useEffect(() => {
    return () => {
      enableScroll();
      document.removeEventListener('keydown', closeModalByEscape);
    };
  }, [closeModalByEscape]);

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
