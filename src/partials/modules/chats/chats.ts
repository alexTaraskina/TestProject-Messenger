import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './chats.css';

export default class Chats extends Block {
    static componentName: string = 'Chats';
    
    render() {
        return template;
    }
}
