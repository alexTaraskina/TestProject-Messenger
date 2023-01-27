import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './message.css';

export default class Message extends Block {
    static componentName: string = 'Message';
    
    render() {
        return template;
    }
}
