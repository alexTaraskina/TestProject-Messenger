import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './chat-area.css';

export default class ChatArea extends Block {
    static componentName: string = 'ChatArea';

    render() {
        return template;
    }
}
