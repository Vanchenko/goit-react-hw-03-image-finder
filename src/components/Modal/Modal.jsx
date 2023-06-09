import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    componentDidMount() {
        console.log('Modal window Mount');
    }
    componentWillUnmount() {
        console.log('Modal destroy');
    }

    render() {
        return createPortal(
            <div className={css.Overlay} >
                <div className={css.Modal}>
                    <img src={this.props.bigImage} alt="" />
                    {this.props.children}
                </div>
            </div>,
            modalRoot,
        )
    }
}
