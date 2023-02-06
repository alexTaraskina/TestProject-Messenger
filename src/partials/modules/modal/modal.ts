import { Block } from "../../../core";
import template from 'bundle-text:./template.hbs';

import './modal.css';

interface ModalProps {
    onBackdropClick?: (e: Event) => void,
};

export default class Modal extends Block<ModalProps> {
    static componentName: string = 'Modal';

    constructor(props: ModalProps) {
        super(props);

        this.setProps({
            onBackdropClick: (e: Event) => this.onBackdropClick(e),
        });
    }

    onBackdropClick(e: Event) {
        let targetEl = e.target as HTMLElement;
        if (targetEl && targetEl.parentNode) {
            targetEl.parentNode.querySelector('.modal')?.classList.remove('active');
        }
    }
    
    render() {
        return template;
    }
}
