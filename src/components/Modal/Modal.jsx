import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
    componentDidMount() {
        console.log('Modal window Mount');
    }
    componentWillUnmount() {
        console.log('Modal destroy');
    }

    render() {
        return (
            <div className={css.overlay} >
                <div className={css.modal}>
                    <img src={this.props.bigImage} alt="" />
                    {this.props.children}
                </div>
            </div>
        )
    }
}
