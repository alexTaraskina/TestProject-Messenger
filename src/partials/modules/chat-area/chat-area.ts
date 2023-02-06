import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './chat-area.css';

interface ChatAreaProps {
    onChoseOptionClick?: (e: Event) => void,
    onAddUserClick?: (e: Event) => void,
    onRemoveUserClick?: (e: Event) => void,
}

export default class ChatArea extends Block<ChatAreaProps> {
    static componentName: string = 'ChatArea';

    constructor(props: ChatAreaProps) {
        super(props);

        this.setProps({
            onChoseOptionClick: (e: Event) => this.onChoseOptionClick(e),
        });

        let actionButton = this.element?.querySelector('#actionsButton');
        if (actionButton) {
            actionButton.addEventListener('click', this.onChoseOptionClick);
        }

        let attachFileButton = this.element?.querySelector('#attachFileButton');
        if (attachFileButton) {
            attachFileButton.addEventListener('click', this.onChoseOptionClick);
        }
    }

    onChoseOptionClick(e: Event) {
        e.preventDefault();
        let el = e.target as HTMLElement;
        if (el && el.parentNode) {
            let options = el.parentNode.querySelector('.jsOptions');
            options?.classList.toggle('active');
        }
    }

    render() {
        return template;
    }
}
