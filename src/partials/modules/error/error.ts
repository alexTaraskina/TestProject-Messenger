import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './error.css';

export default class Error extends Block {
    static componentName: string = 'Error';
    
    render() {
        return template;
    }
}
