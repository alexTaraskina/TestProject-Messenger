import { Block } from '../../../core';
import template from 'bundle-text:./template.hbs';

import './key-value-line.css';

export default class KeyValueLine extends Block {
    static componentName: string = 'KeyValueLine';

    render() {
        return template;
    }
}
