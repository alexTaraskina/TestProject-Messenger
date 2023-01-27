import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './link.css';

export default class Link extends Block {
    static componentName: string = 'Link';

    render() {
        return template; 
    }
}
