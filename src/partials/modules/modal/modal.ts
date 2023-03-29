import { Block } from '../../../core';
import './modal.css';

import template from './template.hbs';

interface ModalProps {
    onBackdropClick?: (e: Event) => void,
    onButtonClick?: (e: Event) => void,
}

export default class Modal extends Block<ModalProps> {
    static componentName: string = 'Modal';

    constructor(props: ModalProps) {
        super({
            ...props,
            onBackdropClick: (e: Event) => this.onBackdropClick(e),
        });
    }

    onBackdropClick(e: Event) {
        const targetEl = e.target as HTMLElement;
        if (targetEl && targetEl.parentNode) {
            targetEl.parentNode.querySelector('.modal')?.classList.remove('active');
        }
    }

    render() {
        return template;
    }
}
