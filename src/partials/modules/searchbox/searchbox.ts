import { Block } from '../../../core';

import './searchbox.css';

import template from './template.hbs';

export default class Searchbox extends Block {
    static componentName: string = 'Searchbox';

    render() {
        return template;
    }
}
