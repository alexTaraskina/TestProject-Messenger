import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './chat-preview.css';

export default class ChatPreview extends Block {
    static componentName: string = 'ChatPreview';

    render() {
        return template;
    }
}
