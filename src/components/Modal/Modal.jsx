import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
//import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


const modalRoot = document.querySelector('#modal-root');
//const targetEl = document.querySelector('#root');

export class Modal extends Component {
  //targetElement = null;
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
   // this.targetElement = document.querySelector('body');
   // disableBodyScroll(this.targetElement)
  }
  componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    //  enableBodyScroll(this.targetElement);
    //  clearAllBodyScrollLocks();
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div
        className={css.Overlay}
        onClick={this.handleBackdropClick}
        // onAfterOpen={() => disableBodyScroll(document)}
        // onAfterClose={() => enableBodyScroll(document)}
      >
        <div className={css.Modal}>
          <img src={this.props.bigImage} alt="" />
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
