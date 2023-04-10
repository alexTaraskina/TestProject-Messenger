import { Block } from '../../../core';
import './message.css';

import template from './template.hbs';

export default class Message extends Block {
    static componentName: string = 'Message';

    render() {
        return template;
    }
}
