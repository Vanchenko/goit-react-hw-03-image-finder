import { Component } from 'react';
import css from './Modal.module.css';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ModalEl = ({bigImage}) => (
      <div
        className={css.Overlay}
        onClick={handleBackdropClick}
        onAfterOpen={() => disableBodyScroll(document)}
        onAfterClose={() => enableBodyScroll(document)}
      >
        <div className={css.Modal}>
          <img src={bigImage} alt="" />
        </div>
      </div>
)
