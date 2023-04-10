import { Block } from '../../../core';
import './key-value-line.css';

import template from './template.hbs';

export default class KeyValueLine extends Block {
    static componentName: string = 'KeyValueLine';

    render() {
        return template;
    }
}
