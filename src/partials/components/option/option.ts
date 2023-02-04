import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './option.css';

export default class Option extends Block {
    static componentName: string = 'Option';
    
    render() {
        return template;
    }
}
