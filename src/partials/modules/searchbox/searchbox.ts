import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './searchbox.css';

export default class Searchbox extends Block {
    static componentName: string = 'Searchbox';
    
    render() {
        return template;
    }
}
